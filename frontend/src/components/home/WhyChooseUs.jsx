import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GrassIcon from '@mui/icons-material/Grass';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppGoodIcon from '@mui/icons-material/GppGood';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const reasons = [
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: 'Certified & Trusted',
      description: 'All our farms are government certified for organic farming.',
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      title: 'High Returns',
      description: 'Consistent ROI of 18-35% annually on investments.',
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: 'Secure Investment',
      description: 'Legal documentation and insurance coverage provided.',
    },
    {
      icon: <VisibilityIcon fontSize="large" />,
      title: 'Full Transparency',
      description: 'Real-time updates and regular progress reports.',
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock.',
    },
    {
      icon: <GrassIcon fontSize="large" />,
      title: 'Eco-Friendly',
      description: 'Sustainable farming for future generations.',
    },
  ];

  // Trust badges (merged from TrustIndicators)
  const badges = [
    {
      icon: <VerifiedUserIcon sx={{ fontSize: { xs: 22, md: 28 } }} />,
      title: 'SEBI Compliant',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <GppGoodIcon sx={{ fontSize: { xs: 22, md: 28 } }} />,
      title: 'ISO Certified',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: { xs: 22, md: 28 } }} />,
      title: 'Govt. Approved',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: <LocalPoliceIcon sx={{ fontSize: { xs: 22, md: 28 } }} />,
      title: '100% Secure',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="pt-6 md:pt-12 pb-12 md:pb-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container-custom">
        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 md:gap-3 group"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform flex-shrink-0`}>
                    {badge.icon}
                  </div>
                  <span className="text-white font-semibold text-xs md:text-base">{badge.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary-500 rounded-full"></span>
              Why Choose Us
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 md:mb-6">
              The{' '}
              <span className="gradient-text">AgroTech Advantage</span>
            </h2>

            <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-8">
              When you invest with AgroTech, you're not just investing in agriculture –
              you're becoming part of a sustainable future.
            </p>

            {/* Reasons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex gap-3 md:gap-4 group"
                >
                  <div className="w-11 h-11 md:w-14 md:h-14 flex-shrink-0 bg-primary-50 rounded-lg md:rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1">{reason.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{reason.description}</p>
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
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80"
                  alt="Modern Farming Technology"
                  className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
                />
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 md:-bottom-6 left-3 md:left-6 right-3 md:right-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6"
              >
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                  <div>
                    <p className="text-lg sm:text-xl md:text-3xl font-bold text-primary-600">99%</p>
                    <p className="text-xs md:text-sm text-gray-500">Satisfaction</p>
                  </div>
                  <div className="border-x border-gray-200">
                    <p className="text-lg sm:text-xl md:text-3xl font-bold text-primary-600">₹50Cr+</p>
                    <p className="text-xs md:text-sm text-gray-500">Returns</p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-3xl font-bold text-primary-600">500+</p>
                    <p className="text-xs md:text-sm text-gray-500">Projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements - Hidden on mobile */}
              <div className="absolute -top-6 -right-6 w-24 md:w-32 h-24 md:h-32 bg-primary-200 rounded-full opacity-50 blur-xl hidden md:block"></div>
              <div className="absolute -bottom-12 -left-6 w-20 md:w-24 h-20 md:h-24 bg-primary-300 rounded-full opacity-40 blur-xl hidden md:block"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
