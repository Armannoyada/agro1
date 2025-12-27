import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import toast from 'react-hot-toast';
import { useCompany } from '../context/CompanyContext';
import { subscribeNewsletter, getCategories } from '../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { getContactInfo, getSocialLinks, loading: companyLoading } = useCompany();

  const contactInfo = getContactInfo();
  const socialLinksData = getSocialLinks();

  // Fetch categories from admin panel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.data) {
          // Show categories from admin (limit to 5)
          setCategories(response.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      try {
        await subscribeNewsletter(email);
        toast.success('Thank you for subscribing!');
        setEmail('');
      } catch (error) {
        toast.error('Subscription failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Join Service', path: '/join' },
  ];

  // Map social link names to icons
  const getSocialIcon = (name) => {
    const icons = {
      facebook: <FacebookIcon />,
      twitter: <TwitterIcon />,
      instagram: <InstagramIcon />,
      linkedin: <LinkedInIcon />,
      youtube: <YouTubeIcon />,
      whatsapp: <WhatsAppIcon />,
    };
    return icons[name] || null;
  };

  // Build full address from contact info
  const getFullAddress = () => {
    if (!contactInfo) return 'Loading...';
    const parts = [
      contactInfo.address,
      contactInfo.city,
      contactInfo.state,
      contactInfo.pincode
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '123 Green Valley, Agriculture Hub, Mumbai';
  };

  return (
    <footer className="bg-gradient-to-b from-primary-900 to-primary-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-primary-800">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Stay Updated with {contactInfo?.companyName || 'AgroTech'}
              </h3>
              <p className="text-primary-200 mb-6">
                Subscribe to our newsletter for the latest updates on farming opportunities and agricultural insights.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-primary-700 text-white placeholder-primary-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-white text-primary-700 rounded-full font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'} <SendIcon fontSize="small" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              {contactInfo?.logo ? (
                <img
                  src={contactInfo.logo}
                  alt={contactInfo.companyName || 'Logo'}
                  className="w-12 h-12 object-contain rounded-xl"
                />
              ) : (
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <AgricultureIcon className="text-primary-400" fontSize="large" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-display font-bold text-white">
                  {contactInfo?.companyName?.split(' ')[0] || 'AgroTech'}
                </h2>
                <p className="text-xs text-primary-300 -mt-1">
                  {contactInfo?.companyName?.split(' ').slice(1).join(' ') || 'Solutions'}
                </p>
              </div>
            </Link>
            <p className="text-primary-200 mb-6 leading-relaxed">
              {contactInfo?.aboutShort || 'We are a leading agro-tech company providing innovative farming solutions and investment opportunities in agriculture. Join us in growing a sustainable future.'}
            </p>
            <div className="flex gap-3">
              {socialLinksData.length > 0 ? (
                socialLinksData.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                  >
                    {getSocialIcon(social.name)}
                  </a>
                ))
              ) : (
                // Fallback if no social links configured
                <>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                    <FacebookIcon />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                    <InstagramIcon />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-white transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Dynamic Categories from Admin */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/services?category=${category.slug}`}
                      className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-white transition-colors"></span>
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    to="/services"
                    className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-white transition-colors"></span>
                    View All Services
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-start gap-3 text-primary-200 hover:text-white transition-colors">
                  <LocationOnIcon className="text-primary-400 mt-0.5" />
                  <span>{getFullAddress()}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo?.phone || '+919876543210'}`}
                  className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors"
                >
                  <PhoneIcon className="text-primary-400" />
                  <span>{contactInfo?.phone || '+91 9876543210'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo?.email || 'info@agrotech.com'}`}
                  className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors"
                >
                  <EmailIcon className="text-primary-400" />
                  <span>{contactInfo?.email || 'info@agrotech.com'}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-300">
            <p>© {new Date().getFullYear()} {contactInfo?.companyName || 'AgroTech Solutions'}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
