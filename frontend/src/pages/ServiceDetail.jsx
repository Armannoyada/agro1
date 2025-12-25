import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GrassIcon from '@mui/icons-material/Grass';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Mock service data - In real app, fetch from API
  const servicesData = {
    'organic-farming': {
      id: 1,
      title: 'Organic Farming Investment',
      coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
      shortDescription: 'Invest in certified organic farming and earn premium returns while contributing to sustainable agriculture.',
      roi: '22-28%',
      minInvestment: '₹50,000',
      maxInvestment: '₹50,00,000',
      duration: '12 months',
      category: 'Farming',
      fullDescription: `
        <p>Organic farming is the future of sustainable agriculture. By investing in our organic farming program, you become part of a movement that prioritizes health, environment, and profitability.</p>
        
        <p>Our organic farms are spread across fertile lands in Maharashtra, Karnataka, and Tamil Nadu. We cultivate a variety of high-demand organic crops including vegetables, grains, pulses, and spices. All our farms are certified by recognized organic certification bodies.</p>
        
        <p>With increasing consumer awareness about health and environment, the demand for organic produce continues to grow. This translates to premium prices and better returns for our investors.</p>
      `,
      features: [
        'Government certified organic farms',
        '100% chemical-free cultivation',
        'Premium quality produce',
        'High market demand',
        'Sustainable practices',
        'Regular farm visits allowed',
      ],
      benefits: [
        'Monthly profit distribution',
        'Transparent reporting',
        'Insurance coverage',
        'Expert farm management',
        'Real-time monitoring app',
        'Dedicated relationship manager',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=600&q=80',
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',
      ],
      stats: [
        { label: 'Acres Under Cultivation', value: '2,500+' },
        { label: 'Active Investors', value: '1,200+' },
        { label: 'Crops Harvested', value: '15+' },
        { label: 'Success Rate', value: '98%' },
      ],
    },
    'hydroponic-systems': {
      id: 2,
      title: 'Hydroponic Farming Systems',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
      shortDescription: 'Modern soil-less farming solutions with advanced technology for maximum yield and efficiency.',
      roi: '25-32%',
      minInvestment: '₹75,000',
      maxInvestment: '₹75,00,000',
      duration: '8 months',
      category: 'Technology',
      fullDescription: `
        <p>Hydroponic farming represents the cutting edge of agricultural technology. Our advanced hydroponic systems enable year-round cultivation with minimal water usage and maximum efficiency.</p>
        
        <p>Located in controlled environment facilities across major metros, our hydroponic farms produce premium quality leafy greens, herbs, and vegetables that command premium prices in the market.</p>
        
        <p>With faster growth cycles and higher yields per square foot, hydroponic farming offers superior returns compared to traditional farming methods.</p>
      `,
      features: [
        'State-of-the-art facilities',
        'Climate-controlled environment',
        '90% less water usage',
        'Pesticide-free produce',
        'Year-round production',
        'IoT-enabled monitoring',
      ],
      benefits: [
        'Higher ROI than traditional farming',
        'Faster harvest cycles',
        'Premium market prices',
        'Lower risk factors',
        'Technology-driven operations',
        'Scalable investment options',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
        'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80',
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
      ],
      stats: [
        { label: 'Hydroponic Units', value: '150+' },
        { label: 'Monthly Harvest', value: '50 Tons' },
        { label: 'Partner Restaurants', value: '200+' },
        { label: 'Cities Covered', value: '10+' },
      ],
    },
  };

  // Default service if slug not found
  const service = servicesData[slug] || servicesData['organic-farming'];

  return (
    <div className="bg-white">
      {/* Hero Cover Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <GrassIcon fontSize="small" />
                {service.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                {service.shortDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-primary-600 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="flex flex-col items-center gap-2">
              <TrendingUpIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">{service.roi}</p>
                <p className="text-sm text-primary-100">Expected ROI</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MonetizationOnIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">{service.minInvestment}</p>
                <p className="text-sm text-primary-100">Min Investment</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AccessTimeIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">{service.duration}</p>
                <p className="text-sm text-primary-100">Duration</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VerifiedIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-primary-100">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  About This Investment
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                />
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {service.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Features & Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div className="bg-primary-50 rounded-2xl p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                    Investor Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <LocalOfferIcon className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Investment Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
                >
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
                    Investment Details
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Minimum Investment</span>
                      <span className="font-semibold text-gray-900">{service.minInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Maximum Investment</span>
                      <span className="font-semibold text-gray-900">{service.maxInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Expected ROI</span>
                      <span className="font-semibold text-primary-600">{service.roi}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">{service.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Payout</span>
                      <span className="font-semibold text-gray-900">Monthly</span>
                    </div>
                  </div>

                  <Link
                    to={`/join/${service.id}`}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    Invest Now
                    <ArrowForwardIcon fontSize="small" />
                  </Link>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white"
                >
                  <h3 className="text-lg font-display font-semibold mb-4">
                    Performance Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {service.stats.map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-primary-100">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                    Have Questions?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our investment advisors are here to help you make the right choice.
                  </p>
                  <Link
                    to="/contact"
                    className="btn-secondary w-full text-center"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
