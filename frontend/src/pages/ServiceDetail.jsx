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
import PetsIcon from '@mui/icons-material/Pets';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import { getServiceBySlug, submitServiceInquiry } from '../services/api';
import GalleryModal from '../components/GalleryModal';
import toast from 'react-hot-toast';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Modal state
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment_amount: '',
  });

  // Fetch service from API
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getServiceBySlug(slug);
        if (response.success && response.data) {
          if (response.data.status === 1 || response.data.status === '1') {
            setService(response.data);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  // Dynamic SEO meta tags
  useEffect(() => {
    if (service) {
      // Update document title
      document.title = `${service.title} | AgroTech Investment`;

      // Create short description from HTML (strip tags)
      const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html || '';
        return tmp.textContent || tmp.innerText || '';
      };
      const shortDesc = stripHtml(service.description).substring(0, 160).trim() + '...';

      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = shortDesc;

      // Update or create Open Graph tags
      const ogTags = {
        'og:title': service.title,
        'og:description': shortDesc,
        'og:image': service.image || 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
        'og:url': window.location.href,
        'og:type': 'product',
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.content = content;
      });
    }

    // Cleanup: Reset title on unmount
    return () => {
      document.title = 'AgroTech - Agricultural Investment Platform';
    };
  }, [service]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setFormLoading(true);
    try {
      const payload = {
        service_id: service.id,
        service_title: service.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        investment_amount: formData.investment_amount || null,
      };

      const response = await submitServiceInquiry(payload);

      if (response.success) {
        toast.success(response.message || 'Application submitted successfully!');
        setShowInvestModal(false);
        setFormData({ name: '', email: '', phone: '', investment_amount: '' });
      } else {
        toast.error(response.error || 'Failed to submit application');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setFormLoading(false);
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
    if (!amount) return 'N/A';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  // Format duration display
  const formatDuration = (months) => {
    if (!months) return 'N/A';
    return `${months} months`;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'farming':
        return <GrassIcon fontSize="small" />;
      case 'livestock':
        return <PetsIcon fontSize="small" />;
      case 'technology':
        return <WaterDropIcon fontSize="small" />;
      default:
        return <AgricultureIcon fontSize="small" />;
    }
  };

  // Get category display name
  const getCategoryName = (category) => {
    switch (category) {
      case 'farming':
        return 'Farming';
      case 'livestock':
        return 'Livestock';
      case 'technology':
        return 'Technology';
      default:
        return category || 'Agriculture';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we fetch the service details.</p>
        </div>
      </div>
    );
  }

  // Error/Not found state
  if (error || !service) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">Service Not Available</h2>
          <p className="text-gray-600 mb-6">The service you are looking for is not available or has been deactivated.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors"
          >
            Browse All Services
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </div>
      </div>
    );
  }

  const defaultFeatures = [
    'Professional farm management',
    'Regular progress updates',
    'Insurance coverage included',
    'Government compliant operations',
    'Sustainable farming practices',
    'Quality assurance standards',
  ];

  const defaultBenefits = [
    'Attractive returns on investment',
    'Transparent reporting',
    'Dedicated relationship manager',
    'Flexible investment options',
    'Risk diversification',
    'Exit options available',
  ];

  const defaultStats = [
    { label: 'Success Rate', value: '95%' },
    { label: 'Active Investors', value: '500+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Years Experience', value: '10+' },
  ];

  return (
    <div className="bg-white">
      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowInvestModal(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10"
          >
            <button
              onClick={() => setShowInvestModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>

            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Invest Now
            </h3>
            <p className="text-gray-600 mb-6">
              Submit your interest for <span className="font-semibold text-primary-600">{service.title}</span>
            </p>

            <form onSubmit={handleSubmit}>
              {/* Hidden fields */}
              <input type="hidden" name="service_id" value={service.id} />
              <input type="hidden" name="service_title" value={service.title} />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="investment_amount"
                      value={formData.investment_amount}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      placeholder="Enter amount"
                      min="0"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Min: {formatInvestment(service.min_investment)} | Max: {formatInvestment(service.max_investment)}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full mt-6 bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formLoading ? 'Submitting...' : 'Submit Application'}
                {!formLoading && <ArrowForwardIcon fontSize="small" />}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Hero Cover Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={service.header_image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80'}
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
                {getCategoryIcon(service.category)}
                {getCategoryName(service.category)}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Invest in {getCategoryName(service.category).toLowerCase()} with expected returns of {formatROI(service.roi_min, service.roi_max)}
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
                <p className="text-2xl font-bold">{formatROI(service.roi_min, service.roi_max)}</p>
                <p className="text-sm text-primary-100">Expected ROI</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MonetizationOnIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">{formatInvestment(service.min_investment)}</p>
                <p className="text-sm text-primary-100">Min Investment</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AccessTimeIcon fontSize="large" />
              <div>
                <p className="text-2xl font-bold">{formatDuration(service.duration_months)}</p>
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

      {/* Trust Badges Section */}
      <section className="bg-gray-50 py-4 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-gray-600">
              <VerifiedIcon className="text-primary-500" fontSize="small" />
              <span className="text-sm font-medium">Verified Agricultural Investment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircleIcon className="text-green-500" fontSize="small" />
              <span className="text-sm font-medium">Government Compliance</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUpIcon className="text-primary-500" fontSize="small" />
              <span className="text-sm font-medium">Transparent Returns</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <AgricultureIcon className="text-green-600" fontSize="small" />
              <span className="text-sm font-medium">Professional Farm Management</span>
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
                  dangerouslySetInnerHTML={{ __html: service.description || '<p>Detailed information about this investment opportunity will be available soon.</p>' }}
                />
              </motion.div>

              {/* Gallery Section */}
              {service.gallery_images && service.gallery_images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CollectionsIcon className="text-primary-500" />
                    Gallery
                  </h2>

                  {/* 2-column grid with larger images */}
                  <div className="grid grid-cols-2 gap-4">
                    {service.gallery_images.slice(0, 4).map((img, index) => {
                      const isLastVisible = index === 3;
                      const hasMoreImages = service.gallery_images.length > 4;
                      const remainingCount = service.gallery_images.length - 4;

                      return (
                        <div
                          key={index}
                          className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                          onClick={() => {
                            setGalleryInitialIndex(index);
                            setShowGalleryModal(true);
                          }}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                          {/* "+N" overlay on last visible image when more exist */}
                          {isLastVisible && hasMoreImages && (
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-white text-4xl md:text-5xl font-bold block">
                                  +{remainingCount}
                                </span>
                                <span className="text-white/80 text-sm mt-1">more images</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* View All Images Link */}
                  <button
                    onClick={() => {
                      setGalleryInitialIndex(0);
                      setShowGalleryModal(true);
                    }}
                    className="mt-5 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                  >
                    <CollectionsIcon fontSize="small" className="group-hover:scale-110 transition-transform" />
                    View All {service.gallery_images.length} Images
                    <ArrowForwardIcon fontSize="small" className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

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
                    {defaultFeatures.map((feature, index) => (
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
                    {defaultBenefits.map((benefit, index) => (
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
                      <span className="font-semibold text-gray-900">{formatInvestment(service.min_investment)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Maximum Investment</span>
                      <span className="font-semibold text-gray-900">{formatInvestment(service.max_investment)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Expected ROI</span>
                      <span className="font-semibold text-primary-600">{formatROI(service.roi_min, service.roi_max)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">{formatDuration(service.duration_months)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Payout</span>
                      <span className="font-semibold text-gray-900">Monthly</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowInvestModal(true)}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    Invest Now
                    <ArrowForwardIcon fontSize="small" />
                  </button>
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
                    {defaultStats.map((stat, index) => (
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

      {/* Gallery Modal */}
      <GalleryModal
        images={service.gallery_images || []}
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        initialIndex={galleryInitialIndex}
      />
    </div>
  );
};

export default ServiceDetail;
