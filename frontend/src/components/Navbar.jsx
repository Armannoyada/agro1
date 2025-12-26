import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PhoneIcon from '@mui/icons-material/Phone';
import { useCompany } from '../context/CompanyContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { getContactInfo } = useCompany();
  const contactInfo = getContactInfo();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <p>🌱 {contactInfo?.tagline || 'Growing Together, Harvesting Success'}</p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${contactInfo?.phone || '+919876543210'}`}
              className="flex items-center gap-1 hover:text-primary-200 transition"
            >
              <PhoneIcon fontSize="small" /> {contactInfo?.phone || '+91 9876543210'}
            </a>
            <span>|</span>
            <a
              href={`mailto:${contactInfo?.email || 'info@agrotech.com'}`}
              className="hover:text-primary-200 transition"
            >
              {contactInfo?.email || 'info@agrotech.com'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              {contactInfo?.logo ? (
                <img
                  src={contactInfo.logo}
                  alt={contactInfo.companyName || 'Logo'}
                  className="w-12 h-12 object-contain rounded-xl transform group-hover:rotate-12 transition-transform duration-300"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <AgricultureIcon className="text-white" fontSize="large" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-display font-bold text-primary-700">
                  {contactInfo?.companyName?.split(' ')[0] || 'AgroTech'}
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  {contactInfo?.companyName?.split(' ').slice(1).join(' ') || 'Solutions'}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-colors duration-300 ${isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/join" className="btn-primary inline-flex items-center gap-2">
                <span>Join Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container-custom py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-2 px-4 rounded-lg transition ${isActive(link.path)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/join"
                  className="block w-full btn-primary text-center mt-4"
                >
                  Join Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
