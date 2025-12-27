import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AboutPreview = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    'Government Certified Organic Farms',
    'Transparent Investment Process',
    'Monthly Profit Distribution',
    'Real-time Farm Monitoring',
    'Expert Agricultural Guidance',
    'Sustainable Farming Practices',
  ];

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8 bg-gradient-to-b from-white to-primary-50" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                  alt="Beautiful Farm"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Floating Experience Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 hidden md:block"
              >
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-primary-600 mb-1">15+</div>
                  <p className="text-gray-600 font-medium">Years of<br />Excellence</p>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-300 rounded-full opacity-40 blur-xl"></div>
            </div>

            {/* Small Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-8 -right-4 md:top-12 md:-right-8 w-32 md:w-48 rounded-2xl overflow-hidden shadow-lg border-4 border-white hidden sm:block"
            >
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80"
                alt="Farmer"
                className="w-full h-32 md:h-48 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              About Our Company
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Pioneering{' '}
              <span className="gradient-text">Sustainable Agriculture</span>{' '}
              For a Better Tomorrow
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              AgroTech Solutions is a leading agricultural technology company dedicated to
              revolutionizing farming through innovative solutions. We bridge the gap between
              investors and sustainable agriculture, creating opportunities for growth while
              nurturing the earth.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              With over 15 years of experience, we've cultivated thousands of acres and
              generated substantial returns for our investors while maintaining the highest
              standards of organic and sustainable farming practices.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircleIcon className="text-primary-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 btn-primary group"
            >
              Learn More About Us
              <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" fontSize="small" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
