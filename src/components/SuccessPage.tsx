import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const paymentCode = searchParams.get('code');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500 mt-2">
              Session ID: {sessionId}
            </p>
          )}
          {paymentCode && (
            <p className="text-sm text-gray-500 mt-1">
              Payment Code: {paymentCode}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What happens next?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a detailed receipt and next steps via email within a few minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Service Instructions</h3>
                <p className="text-gray-600 text-sm">
                  We'll send you detailed instructions on how to proceed with your repair service.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Service Payment Complete - Next Steps</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>• Check your email for detailed service instructions</p>
              <p>• Our team will contact you within 24 hours to coordinate next steps</p>
              <p>• For mail-in services: shipping instructions and prepaid label will be provided</p>
              <p>• For remote support: we'll schedule a convenient time to connect</p>
              <p>• Service completion within 2-10 business days depending on complexity</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Return Home
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <p className="text-gray-600">
            Questions? Contact us at{' '}
            <a href="mailto:remotebyteclinic@gmail.com" className="text-blue-600 hover:underline">
              remotebyteclinic@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;