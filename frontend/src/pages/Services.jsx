import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PetsIcon from '@mui/icons-material/Pets';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getServices, getCategories } from '../services/api';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filter, setFilter] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Services', slug: 'all' }]);
  const [loading, setLoading] = useState(true);

  // Gradient colors for service cards
  const cardGradients = [
    'from-blue-500 to-indigo-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-pink-600'
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

  // Fetch services and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await getServices();
        const activeServices = (servicesResponse.data || []).filter(s => s.status === 1 || s.status === '1');
        setServices(activeServices);

        // Fetch categories
        const categoriesResponse = await getCategories();
        const backendCategories = categoriesResponse.data || [];
        // Prepend 'All Services' option
        setCategories([
          { id: 'all', name: 'All Services', slug: 'all' },
          ...backendCategories.map(cat => ({ id: cat.slug, name: cat.name, slug: cat.slug }))
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update filter when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setFilter(categoryParam);
    }
  }, [categoryParam]);

  // Filter services by category and search
  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.category === filter;
    const matchesSearch =
      (service.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (service.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats for hero section
  const stats = [
    { icon: <AgricultureIcon />, value: `${services.length}+`, label: 'Investment Options' },
    { icon: <TrendingUpIcon />, value: 'Up to 25%', label: 'Annual Returns' },
    { icon: <AccountBalanceWalletIcon />, value: '₹30K', label: 'Min. Investment' },
    { icon: <VerifiedIcon />, value: '100%', label: 'Secure & Verified' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Full Width Image */}
      <section className="relative min-h-[500px] md:min-h-[550px] pb-20" ref={heroRef}>
        <img
          src="https://images.unsplash.com/photo-1625246333195-5848c428148f?w=1600&q=80"
          alt="Agricultural Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                Investment Opportunities
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Grow Your Wealth with
                <br />
                <span className="text-primary-400">Agricultural</span> Investments
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                Choose from our diverse range of agricultural investment services.
                Each option is designed to maximize your returns while contributing to sustainable farming.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Browse Services
                  <KeyboardArrowDownIcon />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  Custom Investment
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${cardGradients[index]} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                        <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating cards */}
      <div className="h-20 md:h-24 bg-white"></div>

      {/* Filter Section */}
      <section id="services" className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <FilterListIcon className="text-gray-400 hidden md:block" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${filter === cat.id
                    ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg'
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
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50" ref={ref}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {filter === 'all' ? 'All Investment' : categories.find(c => c.id === filter)?.name} <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
            </p>
          </motion.div>

          {loading ? (
            // Loading skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100 mb-4">
                      <div className="h-10 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors"
              >
                View All Services
              </button>
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
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.thumbnail_image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Featured Badge */}
                      {(service.featured === 1 || service.featured === '1') && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                          ⭐ Featured
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full capitalize shadow-md">
                        {service.category}
                      </div>

                      {/* Icon */}
                      <div className={`absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-br ${cardGradients[index % cardGradients.length]} rounded-xl shadow-lg flex items-center justify-center text-white`}>
                        {getCategoryIcon(service.category)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-2 text-sm" dangerouslySetInnerHTML={{ __html: service.description || '' }} />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 py-4 border-t border-gray-100 mb-4">
                        <div className="text-center p-2 bg-green-50 rounded-xl">
                          <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                            <TrendingUpIcon sx={{ fontSize: 16 }} />
                          </div>
                          <p className="font-bold text-green-600 text-sm">{formatROI(service.roi_min, service.roi_max)}</p>
                          <p className="text-xs text-gray-500">Returns</p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-xl">
                          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                            <AccountBalanceWalletIcon sx={{ fontSize: 16 }} />
                          </div>
                          <p className="font-bold text-blue-600 text-sm">{formatInvestment(service.min_investment)}</p>
                          <p className="text-xs text-gray-500">Min. Invest</p>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded-xl">
                          <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                          </div>
                          <p className="font-bold text-purple-600 text-sm">{service.duration_months ? `${service.duration_months}M` : 'N/A'}</p>
                          <p className="text-xs text-gray-500">Duration</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all group/btn"
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
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-green-500 rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Custom Solutions
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10">
                  Contact us to discuss custom investment opportunities tailored to your specific needs and goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    Contact Us
                    <ArrowForwardIcon />
                  </Link>
                  <a
                    href="tel:+911234567890"
                    className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
