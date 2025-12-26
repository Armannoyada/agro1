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
import { useCompany } from '../../context/CompanyContext';

const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { statistics, loading } = useCompany();

  // Map icon names to actual icons
  const getIcon = (iconName) => {
    const icons = {
      'users': <PeopleIcon fontSize="large" />,
      'people': <PeopleIcon fontSize="large" />,
      'landscape': <LandscapeIcon fontSize="large" />,
      'calendar': <CalendarMonthIcon fontSize="large" />,
      'trending_up': <TrendingUpIcon fontSize="large" />,
      'eco': <NatureIcon fontSize="large" />,
      'nature': <NatureIcon fontSize="large" />,
      'agriculture': <AgricultureIcon fontSize="large" />,
      'groups': <GroupsIcon fontSize="large" />,
      'star': <StarIcon fontSize="large" />,
    };
    return icons[iconName] || <TrendingUpIcon fontSize="large" />;
  };

  // Color palette for stats
  const colors = [
    'from-green-400 to-green-600',
    'from-emerald-400 to-emerald-600',
    'from-teal-400 to-teal-600',
    'from-lime-400 to-lime-600',
  ];

  // Default stats if none loaded
  const defaultStats = [
    { icon: 'users', value: '5000', suffix: '+', label: 'Happy Farmers' },
    { icon: 'landscape', value: '10000', suffix: '+', label: 'Acres Cultivated' },
    { icon: 'calendar', value: '15', suffix: '+', label: 'Years Experience' },
    { icon: 'trending_up', value: '25', suffix: '%', label: 'Average ROI' },
  ];

  const statsToDisplay = statistics && statistics.length > 0 ? statistics : defaultStats;

  return (
    <section className="py-16 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsToDisplay.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-nature-lg transition-all duration-300 border border-gray-100 relative overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(stat.icon)}
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
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
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
