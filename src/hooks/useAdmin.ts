import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user is in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          // User is admin if they exist in admin_users table
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, authLoading]);

  const checkMasterKey = (key: string): boolean => {
    // Master key validation is now handled server-side for security
    return true; // This will be validated by the server
  };

  const promoteToAdmin = async (masterKey: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return false;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/promote-admin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          masterKey: masterKey,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAdmin(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error promoting to admin:', error);
      return false;
    }
  };

        });

      if (error) {
        console.error('Error promoting to admin:', error);
        return false;
      }

      setIsAdmin(true);
      return true;
    } catch (error) {
      console.error('Error promoting to admin:', error);
      return false;
    }
  };

  return {
    isAdmin,
    loading: loading || authLoading,
    checkMasterKey,
    promoteToAdmin,
  };
};