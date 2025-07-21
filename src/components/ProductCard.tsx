import React, { useState } from 'react';
import { StripeProduct } from '../stripe-config';
import { CreditCard, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProductCardProps {
  product: StripeProduct;
  user: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, user }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: product.priceId,
          mode: product.mode,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="text-center mb-8">
        <div className="text-3xl font-bold text-blue-600 mb-2">
          Contact for Quote
        </div>
        <p className="text-sm text-gray-500">
          {product.mode === 'subscription' ? 'Monthly billing' : 'One-time payment'}
        </p>
      </div>

      <button
        onClick={handlePurchase}
        disabled={loading || !user}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          loading || !user
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            {product.mode === 'subscription' ? 'Subscribe Now' : 'Purchase Service'}
          </>
        )}
      </button>

      {!user && (
        <p className="text-center text-sm text-gray-500 mt-3">
          Please sign in to purchase this service
        </p>
      )}
    </div>
  );
};

export default ProductCard;