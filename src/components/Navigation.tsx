
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-900">Novus</span>
            <span className="text-2xl font-light text-gray-600">Furniture</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-amber-900 border-b-2 border-amber-900 pb-1'
                    : 'text-gray-700 hover:text-amber-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-amber-900 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
