import React, { useState } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAdmin } from '../hooks/useAdmin';
import AdminLogin from './AdminLogin';

interface PaymentCode {
  id: string;
  code: string;
  price: number;
  description: string;
  created: Date;
  used: boolean;
  stripe_price_id?: string;
}

const AdminPanel: React.FC = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [hasAccess, setHasAccess] = useState(false);
  const [codes, setCodes] = useState<PaymentCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newCode, setNewCode] = useState({
    price: '',
    description: ''
  });

  // Show loading while checking admin status
  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show admin login if user doesn't have access yet
  if (!hasAccess) {
    return <AdminLogin onAdminAccess={() => setHasAccess(true)} />;
  }

  // Load codes from database
  const loadCodes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading codes:', error);
        alert('Failed to load payment codes');
        return;
      }

      const formattedCodes = data.map(code => ({
        id: code.id,
        code: code.code,
        price: parseFloat(code.price),
        description: code.description,
        created: new Date(code.created_at),
        used: code.used,
        stripe_price_id: code.stripe_price_id,
      }));

      setCodes(formattedCodes);
    } catch (error) {
      console.error('Error loading codes:', error);
      alert('Failed to load payment codes');
    } finally {
      setLoading(false);
    }
  };

  // Load codes when authenticated
  React.useEffect(() => {
    if (hasAccess) {
      loadCodes();
    }
  }, [hasAccess]);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateCode = async () => {
    if (!newCode.price || !newCode.description) {
      alert('Please fill in all fields');
      return;
    }

    setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Please log in to create payment codes');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: parseFloat(newCode.price),
          description: newCode.description,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment code');
      }

      const result = await response.json();
      
      if (result.success) {
        alert(`Payment code created successfully: ${result.code.code}`);
        setNewCode({ price: '', description: '' });
        await loadCodes(); // Reload codes
      } else {
        throw new Error('Failed to create payment code');
      }
    } catch (error: any) {
      console.error('Error creating code:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCode = (id: string) => {
    if (confirm('Are you sure you want to delete this code?')) {
      setCodes(prev => prev.filter(code => code.id !== id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
              <p className="text-gray-600">Manage payment codes for repair services</p>
            </div>
            <button
              onClick={() => setHasAccess(false)}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Create New Code */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Payment Code</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                value={newCode.price}
                onChange={(e) => setNewCode(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="149.99"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Service Description
              </label>
              <input
                type="text"
                id="description"
                value={newCode.description}
                onChange={(e) => setNewCode(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Laptop Screen Replacement"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleCreateCode}
                disabled={creating}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  creating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {creating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Codes List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Payment Codes</h2>
            <p className="text-gray-600 mt-1">
              {loading ? 'Loading...' : `${codes.length} total codes`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading payment codes...</p>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {codes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {code.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(code.code)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{code.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${code.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {code.created.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        code.used
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {code.used ? 'Used' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteCode(code.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          {codes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No payment codes created yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;