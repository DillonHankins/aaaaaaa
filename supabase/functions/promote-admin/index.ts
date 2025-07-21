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

    // Get user from auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return corsResponse({ error: 'No authorization header' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return corsResponse({ error: 'Invalid authentication' }, 401);
    }

    const { masterKey } = await req.json();

    if (!masterKey) {
      return corsResponse({ error: 'Master key is required' }, 400);
    }

    // Check master key against server environment variable
    const validMasterKey = Deno.env.get('ADMIN_MASTER_KEY') || 'new-secure-master-key-2025';
    
    if (masterKey !== validMasterKey) {
      return corsResponse({ error: 'Invalid master key' }, 401);
    }

    // Check if user is already an admin
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingAdmin) {
      return corsResponse({ success: true, message: 'User is already an admin' });
    }

    // Promote user to admin
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert({
        user_id: user.id,
        created_by: user.id
       });

      if (insertError) {
        console.error('Error promoting to admin:', insertError);
        return corsResponse({ error: 'Failed to promote user to admin' }, 500);
      }

      return corsResponse({ success: true, message: 'Successfully promoted to admin' });

    } catch (error: any) {
      console.error('Error in promote-admin function:', error);
      return corsResponse({ error: error.message }, 500);
    }
});