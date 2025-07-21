import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  deviceType: string;
  issueDescription: string;
  preferredService: 'mail-in' | 'remote';
}

const QuoteRequest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    deviceType: '',
    issueDescription: '',
    preferredService: 'mail-in'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    console.log('Email would be sent to: remotebyteclinic@gmail.com');

    setIsSubmitting(false);
    navigate('/confirmation', { state: { formData } });
  };

  const isFormValid = formData.name && formData.email && formData.deviceType && formData.issueDescription;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Request Your Quote
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your computer issue and we'll provide a detailed quote within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-2">
                Device Type *
              </label>
              <select
                id="deviceType"
                name="deviceType"
                value={formData.deviceType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select device type</option>
                <option value="desktop">Desktop Computer</option>
                <option value="laptop">Laptop</option>
                <option value="tablet">Tablet</option>
                <option value="smartphone">Smartphone</option>
                <option value="server">Server</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="preferredService" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Service *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.preferredService === 'mail-in' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="preferredService"
                    value="mail-in"
                    checked={formData.preferredService === 'mail-in'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Mail-in Service</div>
                    <div className="text-sm text-gray-600">Ship your device to us</div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.preferredService === 'remote' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="preferredService"
                    value="remote"
                    checked={formData.preferredService === 'remote'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Remote Support</div>
                    <div className="text-sm text-gray-600">Online assistance</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Description of Issue *
              </label>
              <textarea
                id="issueDescription"
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Please describe your computer issue in detail. Include any error messages, when the problem started, and what you were doing when it occurred."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting Request...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Quote Request
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>What happens next?</strong> We'll review your request and send a detailed quote to your email within 24 hours. No commitment required.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;