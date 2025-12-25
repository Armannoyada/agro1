import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GrassIcon from '@mui/icons-material/Grass';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const ServicesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      id: 1,
      slug: 'organic-farming',
      icon: <GrassIcon fontSize="large" />,
      title: 'Organic Farming',
      description: 'Invest in certified organic farming with premium returns. Chemical-free produce with high market demand.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
      roi: '22-28%',
      minInvestment: '₹50,000',
      featured: true,
    },
    {
      id: 2,
      slug: 'hydroponic-systems',
      icon: <WaterDropIcon fontSize="large" />,
      title: 'Hydroponic Systems',
      description: 'Modern soil-less farming solutions for urban agriculture. High yield in minimal space.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      roi: '25-32%',
      minInvestment: '₹75,000',
      featured: true,
    },
    {
      id: 3,
      slug: 'dairy-farming',
      icon: <PetsIcon fontSize="large" />,
      title: 'Dairy Farming',
      description: 'Integrated dairy farming with consistent monthly returns. Premium quality milk production.',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=600&q=80',
      roi: '18-24%',
      minInvestment: '₹1,00,000',
      featured: false,
    },
    {
      id: 4,
      slug: 'fruit-orchards',
      icon: <ParkIcon fontSize="large" />,
      title: 'Fruit Orchards',
      description: 'Long-term investment in fruit orchards with high yield potential. Mangoes, apples, and citrus fruits.',
      image: 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?w=600&q=80',
      roi: '20-30%',
      minInvestment: '₹2,00,000',
      featured: true,
    },
    {
      id: 5,
      slug: 'mushroom-cultivation',
      icon: <GrassIcon fontSize="large" />,
      title: 'Mushroom Cultivation',
      description: 'High-profit mushroom farming with quick returns. Low investment, high demand produce.',
      image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=600&q=80',
      roi: '35-45%',
      minInvestment: '₹30,000',
      featured: false,
    },
    {
      id: 6,
      slug: 'contract-farming',
      icon: <AgricultureIcon fontSize="large" />,
      title: 'Contract Farming',
      description: 'Partner with established brands for guaranteed buyback. Secure investment with assured returns.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
      roi: '15-22%',
      minInvestment: '₹1,50,000',
      featured: false,
    },
  ];

  return (
    <section className="section-padding bg-white" ref={ref}>
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
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {service.featured && (
                    <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Icon */}
                  <div className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Expected ROI</p>
                      <p className="text-lg font-bold text-primary-600">{service.roi}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Min. Investment</p>
                      <p className="text-lg font-bold text-gray-900">{service.minInvestment}</p>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
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
