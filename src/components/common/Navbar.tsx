import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sword, User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Free Trial', path: '/trial' },
    { name: 'Member Portal', path: '/portal' },
    { name: 'Instructors', path: '/instructors' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center text-white"
            >
              <Sword size={24} strokeWidth={2.5} />
            </motion.div>
            <span className="font-display font-bold text-2xl tracking-tighter uppercase transition-colors group-hover:text-crimson">
              Bushido<span className="text-crimson group-hover:text-black">Dojo</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-display font-medium text-sm uppercase tracking-widest transition-all hover:text-crimson relative py-2",
                  location.pathname === link.path ? "text-crimson" : "text-black/60"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/portal"
              className="bg-black text-white px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-widest hover:bg-crimson transition-colors flex items-center gap-2"
            >
              <User size={16} />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black hover:text-crimson transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-b border-black/5 px-4 pb-6 pt-2"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-display font-bold text-xl uppercase tracking-wider",
                  location.pathname === link.path ? "text-crimson" : "text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/portal"
              onClick={() => setIsOpen(false)}
              className="bg-crimson text-white px-6 py-4 rounded-xl font-display font-bold text-center uppercase tracking-widest"
            >
              Portal Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
