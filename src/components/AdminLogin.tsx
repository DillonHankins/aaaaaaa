import React, { useState } from 'react';
import { Shield, Key, User, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

interface AdminLoginProps {
  onAdminAccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onAdminAccess }) => {
  const { user } = useAuth();
  const { isAdmin, promoteToAdmin } = useAdmin();
  const [masterKey, setMasterKey] = useState('');
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMasterKeySubmit = async () => {
    if (!masterKey.trim()) {
      setError('Please enter the master key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await promoteToAdmin(masterKey);
      
      if (success) {
        onAdminAccess();
      } else {
        setError('Invalid master key');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If user is already admin, grant access immediately
  React.useEffect(() => {
    if (isAdmin) {
      onAdminAccess();
    }
  }, [isAdmin, onAdminAccess]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
              <p className="text-gray-600">Please sign in to access the admin panel</p>
            </div>

            <div className="space-y-4">
              <Link 
                to="/login"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
              <User className="h-4 w-4" />
              <span className="text-sm">Signed in as: {user.email}</span>
            </div>
            <p className="text-gray-600">Enter the master key to gain admin privileges</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700 mb-2">
                Master Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showMasterKey ? 'text' : 'password'}
                  id="masterKey"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter master key"
                  onKeyPress={(e) => e.key === 'Enter' && handleMasterKeySubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowMasterKey(!showMasterKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showMasterKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Contact your administrator for the master key
              </p>
            </div>

            <button
              onClick={handleMasterKeySubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Verifying...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;