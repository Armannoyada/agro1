import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GrassIcon from '@mui/icons-material/Grass';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const reasons = [
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: 'Certified & Trusted',
      description: 'All our farms are government certified for organic farming with proper documentation.',
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'High Returns',
      description: 'Consistent ROI of 18-35% annually, higher than traditional investment options.',
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: 'Secure Investment',
      description: 'Your investment is secured with proper legal documentation and insurance coverage.',
    },
    {
      icon: <VisibilityIcon fontSize="large" />,
      title: 'Full Transparency',
      description: 'Track your investment with real-time updates and regular progress reports.',
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock to assist you with any queries.',
    },
    {
      icon: <GrassIcon fontSize="large" />,
      title: 'Eco-Friendly',
      description: 'We practice sustainable farming that protects the environment for future generations.',
    },
  ];

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Why Choose Us
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              The{' '}
              <span className="gradient-text">AgroTech Advantage</span>
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              When you invest with AgroTech, you're not just investing in agriculture – 
              you're becoming part of a sustainable future. Here's why thousands trust us:
            </p>

            {/* Reasons Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{reason.title}</h4>
                    <p className="text-sm text-gray-600">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80"
                  alt="Modern Farming Technology"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-primary-600">99%</p>
                    <p className="text-sm text-gray-500">Satisfaction Rate</p>
                  </div>
                  <div className="border-x border-gray-200">
                    <p className="text-2xl md:text-3xl font-bold text-primary-600">₹50Cr+</p>
                    <p className="text-sm text-gray-500">Returns Generated</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-primary-600">500+</p>
                    <p className="text-sm text-gray-500">Active Projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-12 -left-6 w-24 h-24 bg-primary-300 rounded-full opacity-40 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
