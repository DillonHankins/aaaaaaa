import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Clock } from 'lucide-react';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quote Request Submitted!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing RemoteByteClinic. We've received your repair request.
          </p>
        </div>

        {formData && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Request Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Name</h3>
                <p className="text-gray-900">{formData.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Email</h3>
                <p className="text-gray-900">{formData.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Device Type</h3>
                <p className="text-gray-900 capitalize">{formData.deviceType}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Service Type</h3>
                <p className="text-gray-900 capitalize">
                  {formData.preferredService === 'mail-in' ? 'Mail-in Service' : 'Remote Support'}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-700 mb-1">Issue Description</h3>
                <p className="text-gray-900">{formData.issueDescription}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Email Sent</h3>
            </div>
            <p className="text-gray-600">
              We've sent a confirmation email to your address with your request details.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Quick Response</h3>
            </div>
            <p className="text-gray-600">
              Expect a detailed quote and next steps within 24 hours.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
          <div className="space-y-3 mb-6">
            <p>📧 You'll receive a detailed quote via email within 24 hours</p>
            <p>🔧 Our technicians will provide a repair timeline and cost breakdown</p>
            <p>📦 If approved, we'll send shipping instructions or schedule remote support</p>
          </div>
          <Link 
            to="/"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Return Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="text-center mt-8">
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

export default Confirmation;