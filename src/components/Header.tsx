import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Computer, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { useAdmin } from '../hooks/useAdmin';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { activeSubscriptionPlan } = useSubscription();
  const { isAdmin } = useAdmin();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Computer className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RemoteByteClinic</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/quote" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/quote') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Request Quote
            </Link>
            {user ? (
              <>
                {activeSubscriptionPlan && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {activeSubscriptionPlan}
                  </span>
                )}
                {isAdmin && (
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    Admin
                  </span>
                )}
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/admin') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Admin
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive('/login') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/quote" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/quote') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                Request Quote
              </Link>
              {user ? (
                <>
                  {activeSubscriptionPlan && (
                    <div className="px-3 py-2">
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {activeSubscriptionPlan}
                      </span>
                    </div>
                  )}
                  {isAdmin && (
                    <div className="px-3 py-2">
                      <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        Admin
                      </span>
                    </div>
                  )}
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive('/login') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="mx-3 my-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center block"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;