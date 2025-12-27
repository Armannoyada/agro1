import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import PeopleIcon from '@mui/icons-material/People';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NatureIcon from '@mui/icons-material/Nature';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useCompany } from '../../context/CompanyContext';

const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { statistics, loading } = useCompany();

  // Map icon names to actual icons - smaller on mobile
  const getIcon = (iconName, isMobile = false) => {
    const size = isMobile ? 28 : 36;
    const icons = {
      'users': <PeopleIcon sx={{ fontSize: size }} />,
      'people': <PeopleIcon sx={{ fontSize: size }} />,
      'landscape': <LandscapeIcon sx={{ fontSize: size }} />,
      'calendar': <CalendarMonthIcon sx={{ fontSize: size }} />,
      'trending_up': <TrendingUpIcon sx={{ fontSize: size }} />,
      'eco': <NatureIcon sx={{ fontSize: size }} />,
      'nature': <NatureIcon sx={{ fontSize: size }} />,
      'agriculture': <AgricultureIcon sx={{ fontSize: size }} />,
      'groups': <GroupsIcon sx={{ fontSize: size }} />,
      'star': <StarIcon sx={{ fontSize: size }} />,
      'feedback': <FeedbackIcon sx={{ fontSize: size }} />,
    };
    return icons[iconName] || <TrendingUpIcon sx={{ fontSize: size }} />;
  };

  // Color gradients for premium look
  const gradients = [
    { bg: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/30' },
    { bg: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/30' },
    { bg: 'from-purple-500 to-indigo-600', glow: 'shadow-purple-500/30' },
    { bg: 'from-orange-500 to-amber-600', glow: 'shadow-orange-500/30' },
    { bg: 'from-pink-500 to-rose-600', glow: 'shadow-pink-500/30' },
  ];

  // Default stats if none loaded - exactly 5 items for one row
  const defaultStats = [
    { icon: 'feedback', value: '1000', suffix: '+', label: 'Customer Feedback' },
    { icon: 'groups', value: '5000', suffix: '+', label: 'Happy Farmers' },
    { icon: 'landscape', value: '10000', suffix: '+', label: 'Acres Cultivated' },
    { icon: 'calendar', value: '15', suffix: '+', label: 'Years Experience' },
    { icon: 'trending_up', value: '25', suffix: '%', label: 'ROI Generated' },
  ];

  const statsToDisplay = statistics && statistics.length > 0 ? statistics : defaultStats;

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden" ref={ref}>
      {/* Background Decorations - Smaller on mobile */}
      <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 md:w-80 h-40 md:h-80 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Section Header */}
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-primary-500 rounded-full animate-pulse"></span>
            Our Achievements
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Numbers That <span className="gradient-text">Speak Trust</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            Our track record demonstrates our commitment to delivering exceptional results for every investor.
          </p>
        </motion.div>

        {/* Stats Grid - 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6">
          {statsToDisplay.slice(0, 5).map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <div className={`bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 text-center shadow-lg md:shadow-xl hover:shadow-2xl ${gradients[index % gradients.length].glow} transition-all duration-500 border border-gray-100/50 relative overflow-hidden h-full`}>
                {/* Decorative Glow */}
                <div className={`absolute -top-10 md:-top-20 -right-10 md:-right-20 w-20 md:w-40 h-20 md:h-40 bg-gradient-to-br ${gradients[index % gradients.length].bg} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-5 rounded-xl md:rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length].bg} flex items-center justify-center text-white shadow-lg md:shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {getIcon(stat.icon)}
                </div>

                {/* Value with Animation */}
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-1 md:mb-2">
                  {inView && (
                    <CountUp
                      end={parseInt(stat.value) || 0}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix || ''}
                    />
                  )}
                </div>

                {/* Label */}
                <p className="text-gray-500 font-medium text-xs md:text-sm lg:text-base">{stat.label}</p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-12 h-1 rounded-full bg-gradient-to-r ${gradients[index % gradients.length].bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
