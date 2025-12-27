import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Leaves - Hidden on mobile for performance */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 md:w-24 h-16 md:h-24 opacity-20 hidden sm:block"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary-500">
            <path d="M50 5C30 5 15 25 10 50c-5 25 10 45 40 45s45-20 40-45C85 25 70 5 50 5zm0 80c-20 0-35-15-30-35S40 15 50 15s25 15 30 35-10 35-30 35z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-10 md:right-20 w-20 md:w-32 h-20 md:h-32 opacity-15 hidden sm:block"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary-600">
            <path d="M50 5C30 5 15 25 10 50c-5 25 10 45 40 45s45-20 40-45C85 25 70 5 50 5zm0 80c-20 0-35-15-30-35S40 15 50 15s25 15 30 35-10 35-30 35z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/4 w-16 md:w-20 h-16 md:h-20 opacity-20 hidden sm:block"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary-400">
            <circle cx="50" cy="50" r="45" />
          </svg>
        </motion.div>

        {/* Gradient Orbs - Smaller on mobile */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container-custom relative z-10 py-8 md:py-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Trusted by 5000+ Farmers
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-4 md:mb-6">
              Growing Together,
              <span className="block gradient-text">Harvesting Success</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              Invest in sustainable agriculture and earn consistent monthly returns.
              We cultivate your investment with cutting-edge agro-technology and
              time-tested farming practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12 justify-center lg:justify-start px-4 sm:px-0">
              <Link to="/services" className="btn-primary text-center py-3 md:py-4 px-6 md:px-8 text-sm md:text-base">
                Explore Services
              </Link>
              <Link to="/join" className="btn-secondary text-center inline-flex items-center justify-center gap-2 py-3 md:py-4 px-6 md:px-8 text-sm md:text-base">
                <PlayArrowIcon className="text-primary-500" />
                Start Investing
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl mx-4 sm:mx-0">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                  alt="Modern Agriculture"
                  className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Average ROI</p>
                        <p className="text-xl md:text-2xl font-bold text-primary-600">25% Per Year</p>
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-100 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards - Hidden on mobile/tablet */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 md:-top-6 -right-2 md:-right-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4 hidden lg:block"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">100% Organic</p>
                    <p className="text-xs md:text-sm text-gray-500">Certified Farms</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 md:-bottom-6 -left-2 md:-left-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4 hidden lg:block"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-lg md:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">Monthly Returns</p>
                    <p className="text-xs md:text-sm text-gray-500">Guaranteed Payouts</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
