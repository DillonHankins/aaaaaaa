import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '', 
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'RemoteByteClinic',
    version: '1.0.0',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function corsResponse(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { price, description } = await req.json();

    if (!price || !description) {
      return corsResponse({ error: 'Price and description are required' }, 400);
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return corsResponse({ error: 'Invalid price' }, 400);
    }

    // Generate unique code
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let code = generateCode();
    
    // Ensure code is unique
    let attempts = 0;
    while (attempts < 10) {
      const { data: existing } = await supabase
        .from('payment_codes')
        .select('id')
        .eq('code', code)
        .single();
      
      if (!existing) break;
      code = generateCode();
      attempts++;
    }

    if (attempts >= 10) {
      return corsResponse({ error: 'Failed to generate unique code' }, 500);
    }

    // Create Stripe product and price
    const product = await stripe.products.create({
      name: `Custom Service: ${description}`,
      description: description,
      metadata: {
        type: 'custom_service',
        code: code,
      },
    });

    const stripePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(priceNum * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        code: code,
      },
    });

    // Store in database
    const { data: paymentCode, error: dbError } = await supabase
      .from('payment_codes')
      .insert({
        code,
        stripe_price_id: stripePrice.id,
        price: priceNum,
        description,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      
      // Clean up Stripe resources
      try {
        await stripe.prices.update(stripePrice.id, { active: false });
        await stripe.products.update(product.id, { active: false });
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
      
      return corsResponse({ error: 'Failed to save payment code' }, 500);
    }

    return corsResponse({
      success: true,
      code: paymentCode,
    });

  } catch (error: any) {
    console.error('Error creating payment code:', error);
    return corsResponse({ error: error.message }, 500);
  }
});