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
    const masterKey = import.meta.env.VITE_ADMIN_MASTER_KEY || 'new-secure-master-key-2025';
    return key === masterKey;
  };

  const promoteToAdmin = async (masterKey: string): Promise<boolean> => {
    if (!user) return false;
    
    if (!checkMasterKey(masterKey)) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .insert({
          user_id: user.id,
          created_by: user.id
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