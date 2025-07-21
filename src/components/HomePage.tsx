import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, Wrench, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { stripeProducts } from '../stripe-config';
import ProductCard from './ProductCard';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              RemoteByteClinic –{' '}
              <span className="text-blue-600">Expert Computer Repairs</span>{' '}
              by Mail or Online
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Describe your issue, mail in your device, and we'll fix it fast.
            </p>
            <Link 
              to="/quote"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting your computer repaired has never been easier. Follow these simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Send className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Submit a Quote Request
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Describe your computer issue in detail. Our experts will review your request and provide a quote.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Send className="h-8 w-8 text-blue-600 transform rotate-45" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mail Your Computer or Get Remote Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Safely package and mail your device to us, or we'll connect remotely to diagnose and fix software issues.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                We Repair It and Send It Back Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our certified technicians fix your device quickly and ship it back with tracking information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">2-10 day repair time</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Service</h3>
              <p className="text-gray-600 text-sm">Your data is protected</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600 text-sm">Certified professionals</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">30-day warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional computer repair services with transparent pricing and fast turnaround times.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stripeProducts.map((product) => (
              <ProductCard key={product.id} product={product} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            About RemoteByteClinic
          </h2>
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RemoteByteClinic is a small, affordable computer repair service dedicated to getting your devices back up and running quickly. We understand that computer problems can be frustrating and disruptive to your daily life or business.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our team of certified technicians provides both remote support for software issues and comprehensive mail-in repair services for hardware problems. With our streamlined process, most repairs are completed within 2–10 days.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We pride ourselves on transparent pricing, excellent communication, and quality workmanship. Your satisfaction is our priority, and we back all our work with a 30-day warranty.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fix Your Computer?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with a free quote today. No obligation, fast response.
          </p>
          <Link 
            to="/quote"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Your Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;