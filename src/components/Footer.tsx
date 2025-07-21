import React from 'react';
import { Mail, Phone, Clock, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">RemoteByteClinic</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Professional computer repair services with fast turnaround times. 
              We specialize in both remote support and mail-in repairs for all types of devices.
            </p>
            <div className="flex items-center text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:remotebyteclinic@gmail.com" className="hover:text-white transition-colors">
                remotebyteclinic@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Mail-in Repairs</li>
              <li>Remote Support</li>
              <li>Hardware Diagnostics</li>
              <li>Software Troubleshooting</li>
              <li>Virus Removal</li>
              <li>Data Recovery</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Why Choose Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-sm">2-10 Day Turnaround</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-sm">30-Day Warranty</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-sm">Free Quotes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} RemoteByteClinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;