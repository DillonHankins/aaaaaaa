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

    const { action, email, masterKey } = await req.json();

    // Verify master key
    const validMasterKey = Deno.env.get('ADMIN_MASTER_KEY') || 'new-secure-master-key-2025';
    if (masterKey !== validMasterKey) {
      return corsResponse({ error: 'Invalid master key' }, 401);
    }

    // Get user by email
    const { data: user, error: userError } = await supabase.auth.admin.getUserByEmail(email);
    
    if (userError || !user) {
      return corsResponse({ error: 'User not found' }, 404);
    }

    if (action === 'add') {
      // Add admin
      const { error } = await supabase
        .from('admin_users')
        .insert({
          user_id: user.id,
          created_by: user.id
        });

      if (error) {
        return corsResponse({ error: 'Failed to add admin' }, 500);
      }

      return corsResponse({ success: true, message: `Added ${email} as admin` });

    } else if (action === 'remove') {
      // Remove admin
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        return corsResponse({ error: 'Failed to remove admin' }, 500);
      }

      return corsResponse({ success: true, message: `Removed ${email} from admin` });

    } else {
      return corsResponse({ error: 'Invalid action. Use "add" or "remove"' }, 400);
    }

  } catch (error: any) {
    console.error('Error managing admin:', error);
    return corsResponse({ error: error.message }, 500);
  }
});