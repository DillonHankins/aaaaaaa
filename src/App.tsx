import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import HomePage from './components/HomePage';
import QuoteRequest from './components/QuoteRequest';
import PaymentPage from './components/PaymentPage';
import AdminPanel from './components/AdminPanel';
import Confirmation from './components/Confirmation';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import SuccessPage from './components/SuccessPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const { loading } = useAuth();

  // Show error message if Supabase is not configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuration Required</h1>
          <p className="text-gray-600 mb-4">
            This application requires environment variables to be configured.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <p className="text-sm text-yellow-800 font-medium mb-2">Missing Environment Variables:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• VITE_SUPABASE_URL</li>
              <li>• VITE_SUPABASE_ANON_KEY</li>
              <li>• VITE_STRIPE_PUBLISHABLE_KEY</li>
              <li>• VITE_ADMIN_MASTER_KEY</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/quote" element={<QuoteRequest />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;