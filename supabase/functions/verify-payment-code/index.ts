import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '', 
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

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

    const { code } = await req.json();

    if (!code) {
      return corsResponse({ error: 'Payment code is required' }, 400);
    }

    // Look up the payment code
    const { data: paymentCode, error } = await supabase
      .from('payment_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !paymentCode) {
      return corsResponse({ error: 'Invalid payment code' }, 404);
    }

    if (paymentCode.used) {
      return corsResponse({ error: 'Payment code has already been used' }, 400);
    }

    return corsResponse({
      success: true,
      code: paymentCode,
    });

  } catch (error: any) {
    console.error('Error verifying payment code:', error);
    return corsResponse({ error: error.message }, 500);
  }
});