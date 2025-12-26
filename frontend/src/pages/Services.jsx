import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PetsIcon from '@mui/icons-material/Pets';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { getServices } from '../services/api';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'farming', name: 'Farming' },
    { id: 'livestock', name: 'Livestock' },
    { id: 'technology', name: 'Technology' },
  ];

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
        // Filter only active services (status === 1)
        const activeServices = (response.data || []).filter(s => s.status === 1 || s.status === '1');
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

  // Filter services by category and search
  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.category === filter;
    const matchesSearch =
      (service.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (service.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Our Services
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Investment <span className="gradient-text">Opportunities</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Choose from our diverse range of agricultural investment services.
              Each option is designed to maximize your returns while contributing to sustainable farming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <FilterListIcon className="text-gray-400 hidden md:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === cat.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading services...</h3>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card-nature h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Featured Badge */}
                      {(service.featured === 1 || service.featured === '1') && (
                        <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                        {service.category}
                      </div>

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
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3" dangerouslySetInnerHTML={{ __html: service.description || '' }} />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">ROI</p>
                          <p className="font-bold text-primary-600">{formatROI(service.roi_min, service.roi_max)}</p>
                        </div>
                        <div className="text-center border-x border-gray-100">
                          <p className="text-xs text-gray-500 uppercase">Min. Invest</p>
                          <p className="font-bold text-gray-900 text-sm">{formatInvestment(service.min_investment)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">Duration</p>
                          <p className="font-bold text-gray-900 text-sm">{service.duration_months ? `${service.duration_months} months` : 'N/A'}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary-50 text-primary-600 rounded-xl font-medium hover:bg-primary-500 hover:text-white transition-colors group/btn"
                      >
                        View Details
                        <ArrowForwardIcon fontSize="small" className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Contact us to discuss custom investment opportunities tailored to your needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300"
            >
              Contact Us
              <ArrowForwardIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
