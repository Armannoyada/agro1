import React, { useState } from 'react';
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

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Join Service', path: '/join' },
  ];

  const services = [
    { name: 'Organic Farming', path: '/services/organic-farming' },
    { name: 'Hydroponic Systems', path: '/services/hydroponic-systems' },
    { name: 'Dairy Farming', path: '/services/dairy-farming' },
    { name: 'Fruit Orchards', path: '/services/fruit-orchards' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, url: '#', label: 'Twitter' },
    { icon: <InstagramIcon />, url: '#', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: '#', label: 'LinkedIn' },
    { icon: <YouTubeIcon />, url: '#', label: 'YouTube' },
    { icon: <WhatsAppIcon />, url: '#', label: 'WhatsApp' },
  ];

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
                Stay Updated with AgroTech
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
                  className="px-6 py-3 bg-white text-primary-700 rounded-full font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe <SendIcon fontSize="small" />
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
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <AgricultureIcon className="text-primary-400" fontSize="large" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">AgroTech</h2>
                <p className="text-xs text-primary-300 -mt-1">Solutions</p>
              </div>
            </Link>
            <p className="text-primary-200 mb-6 leading-relaxed">
              We are a leading agro-tech company providing innovative farming solutions and investment 
              opportunities in agriculture. Join us in growing a sustainable future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
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

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full group-hover:bg-white transition-colors"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-start gap-3 text-primary-200 hover:text-white transition-colors">
                  <LocationOnIcon className="text-primary-400 mt-0.5" />
                  <span>123 Green Valley, Agriculture Hub,<br />Mumbai, Maharashtra 400001</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors">
                  <PhoneIcon className="text-primary-400" />
                  <span>+91 9876543210</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@agrotech.com" className="flex items-center gap-3 text-primary-200 hover:text-white transition-colors">
                  <EmailIcon className="text-primary-400" />
                  <span>info@agrotech.com</span>
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
            <p>© {new Date().getFullYear()} AgroTech Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
