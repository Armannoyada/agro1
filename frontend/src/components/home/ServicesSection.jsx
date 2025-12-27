import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PetsIcon from '@mui/icons-material/Pets';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { getServices } from '../../services/api';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80';

const ServicesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map category to icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'farming':
        return <GrassIcon fontSize="large" />;
      case 'livestock':
        return <PetsIcon fontSize="large" />;
      case 'technology':
        return <WaterDropIcon fontSize="large" />;
      default:
        return <AgricultureIcon fontSize="large" />;
    }
  };

  // Format ROI display
  const formatROI = (roiMin, roiMax) => {
    if (!roiMin && !roiMax) return 'N/A';
    if (roiMin && roiMax && roiMin !== roiMax) return `${roiMin}-${roiMax}%`;
    return `${roiMin || roiMax}%`;
  };

  // Format investment display
  const formatInvestment = (amount) => {
    if (!amount) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        // Filter only active services and limit to 6 for homepage
        const activeServices = (response.data || [])
          .filter(s => s.status === 1 || s.status === '1')
          .slice(0, 6);
        setServices(activeServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Our Investment Services
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
            Choose Your{' '}
            <span className="gradient-text">Agricultural Investment</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our diverse range of agricultural investment opportunities.
            Each service is designed to maximize your returns while promoting sustainable farming.
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading services...</h3>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services available</h3>
            <p className="text-gray-600">Check back soon for new investment opportunities.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-nature h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.thumbnail_image || DEFAULT_IMAGE}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Featured Badge */}
                    {(service.featured === 1 || service.featured === '1') && (
                      <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                      {getCategoryIcon(service.category)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-2" dangerouslySetInnerHTML={{ __html: service.description || '' }} />

                    {/* Stats */}
                    <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Expected ROI</p>
                        <p className="text-lg font-bold text-primary-600">{formatROI(service.roi_min, service.roi_max)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Min. Investment</p>
                        <p className="text-lg font-bold text-gray-900">{formatInvestment(service.min_investment)}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary-50 text-primary-600 rounded-xl font-medium hover:bg-primary-500 hover:text-white transition-colors group/btn"
                    >
                      Learn More
                      <ArrowForwardIcon fontSize="small" className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link to="/services" className="btn-primary inline-flex items-center gap-2">
            View All Services
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
