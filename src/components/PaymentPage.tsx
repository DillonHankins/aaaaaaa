import React, { useState } from 'react';
import { CreditCard, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const PaymentPage: React.FC = () => {
  const [paymentCode, setPaymentCode] = useState('');
  const [codeDetails, setCodeDetails] = useState<{ 
    price: number; 
    description: string; 
    stripe_price_id: string;
    id: string;
  } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();

  const handleCodeCheck = async () => {
    if (!paymentCode.trim()) {
      alert('Please enter a payment code');
      return;
    }

    setVerifying(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: paymentCode.trim().toUpperCase(),
        }),
      });

      const result = await response.json();

      if (result.success && result.code) {
        setCodeDetails({
          price: parseFloat(result.code.price),
          description: result.code.description,
          stripe_price_id: result.code.stripe_price_id,
          id: result.code.id,
        });
      } else {
        setCodeDetails(null);
        alert(result.error || 'Invalid payment code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Failed to verify payment code. Please try again.');
      setCodeDetails(null);
    } finally {
      setVerifying(false);
    }
  };

  const handlePayment = async () => {
    if (!codeDetails || !user) {
      alert('Please sign in to complete payment');
      return;
    }

    setProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        alert('Please sign in to complete payment');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: codeDetails.stripe_price_id,
          mode: 'payment',
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&code=${paymentCode}`,
          cancel_url: `${window.location.origin}/payment`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setPaymentCode('');
    setCodeDetails(null);
  };
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Secure Payment
          </h1>
          <p className="text-lg text-gray-600">
            Enter your payment code to proceed with the transaction.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Payment Code Input */}
          <div className="mb-8">
            <label htmlFor="paymentCode" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Code *
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="paymentCode"
                value={paymentCode}
                onChange={(e) => setPaymentCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your payment code"
              />
              <button
                onClick={handleCodeCheck}
                disabled={verifying}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  verifying
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {verifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
            {codeDetails && (
              <button
                onClick={resetForm}
                className="text-sm text-blue-600 hover:text-blue-700 mt-2"
              >
                Use different code
              </button>
            )}
          </div>

          {/* Code Details */}
          {codeDetails && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Payment Details</h3>
              <div className="text-green-700">
                <p className="mb-1">{codeDetails.description}</p>
                <p className="text-2xl font-bold">${codeDetails.price}</p>
              </div>
            </div>
          )}

          {/* Payment Button */}
          {codeDetails && (
            <div className="space-y-6">
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Your payment information is secure and encrypted
                </span>
              </div>

              {!user && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-center">
                    Please <Link to="/login" className="text-blue-600 hover:underline">sign in</Link> to complete your payment
                  </p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={processing || !user}
                className={`w-full flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg ${
                  processing || !user
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 hover:shadow-xl'
                }`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay ${codeDetails.price.toFixed(2)} with Stripe
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;