import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
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
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar - Enhanced */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white py-3 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="text-lg">🌱</span>
            <span className="text-primary-100">{contactInfo?.tagline || 'Growing Together, Harvesting Success'}</span>
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${contactInfo?.phone || '+919876543210'}`}
              className="flex items-center gap-2 hover:text-primary-200 transition-colors text-sm font-medium"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <PhoneIcon sx={{ fontSize: 16 }} />
              </div>
              <span>{contactInfo?.phone || '+91 9876543210'}</span>
            </a>
            <div className="w-px h-5 bg-primary-400"></div>
            <a
              href={`mailto:${contactInfo?.email || 'info@agrotech.com'}`}
              className="flex items-center gap-2 hover:text-primary-200 transition-colors text-sm font-medium"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <EmailIcon sx={{ fontSize: 16 }} />
              </div>
              <span>{contactInfo?.email || 'info@agrotech.com'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - Enhanced & Bigger */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-xl py-2'
          : 'bg-white py-3'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Bigger */}
            <Link to="/" className="flex items-center gap-3 group">
              {contactInfo?.logo ? (
                <img
                  src={contactInfo.logo}
                  alt={contactInfo.companyName || 'Logo'}
                  className="w-14 h-14 object-contain rounded-xl shadow-md transform group-hover:rotate-6 transition-transform duration-300"
                />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <AgricultureIcon className="text-white" sx={{ fontSize: 32 }} />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-display font-bold text-primary-700">
                  {contactInfo?.companyName?.split(' ')[0] || 'AgroTech'}
                </h1>
                <p className="text-sm text-gray-500 -mt-0.5">
                  {contactInfo?.companyName?.split(' ').slice(1).join(' ') || 'Solutions'}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Bigger & Bolder */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-3 rounded-full font-semibold text-base transition-all duration-300 ${isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button - Bigger & More Prominent */}
            <div className="hidden md:block">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-bold text-base hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Join Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <CloseIcon sx={{ fontSize: 28 }} /> : <MenuIcon sx={{ fontSize: 28 }} />}
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
              className="md:hidden bg-white border-t shadow-lg"
            >
              <div className="container-custom py-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-3 px-5 rounded-xl transition text-lg font-medium ${isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/join"
                  className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-4 rounded-xl font-bold text-lg mt-4 shadow-lg"
                >
                  Join Now →
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
