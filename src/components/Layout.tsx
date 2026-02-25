import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldAlert, BookOpen, MapPin, Home, Menu, X, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Emergency Help', path: '/emergency', icon: ShieldAlert },
    { name: 'Govt Schemes', path: '/schemes', icon: BookOpen },
    { name: 'Local Help', path: '/local-help', icon: MapPin },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-orange-500 text-white p-2 rounded-xl group-hover:bg-orange-600 transition-colors">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-bold text-2xl tracking-tight text-slate-900">SAHAAY</span>
                  <span className="block text-[10px] uppercase tracking-wider text-orange-600 font-semibold leading-none">Digital Sahaara</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-orange-600",
                      isActive ? "text-orange-600" : "text-slate-600"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                      isActive ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartHandshake className="h-6 w-6 text-orange-500" />
                <span className="font-bold text-2xl tracking-tight text-white">SAHAAY</span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">
                "Problem sabke paas hoti hai, solution sabko nahi milta. SAHAAY milta hai."
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                <li><Link to="/emergency" className="hover:text-orange-400 transition-colors">Emergency Help</Link></li>
                <li><Link to="/schemes" className="hover:text-orange-400 transition-colors">Govt Schemes</Link></li>
                <li><Link to="/local-help" className="hover:text-orange-400 transition-colors">Local Help</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal & Trust</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Verified Information</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
            &copy; {new Date().getFullYear()} SAHAAY. Har Samasya ka Digital Sahaara.
          </div>
        </div>
      </footer>
    </div>
  );
}
