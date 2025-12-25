import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const steps = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: 'Choose a Service',
      description: 'Browse our agricultural investment options and select the one that matches your goals and budget.',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      title: 'Make Investment',
      description: 'Complete your investment through our secure platform. Start with amounts as low as ₹30,000.',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: <AgricultureIcon fontSize="large" />,
      title: 'We Cultivate',
      description: 'Our expert team manages the farming operations using cutting-edge agro-technology and best practices.',
      color: 'from-teal-400 to-teal-600',
    },
    {
      icon: <AccountBalanceWalletIcon fontSize="large" />,
      title: 'Earn Returns',
      description: 'Receive your profits monthly directly to your bank account. Track your investment growth in real-time.',
      color: 'from-lime-400 to-lime-600',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
            How{' '}
            <span className="gradient-text">AgroTech</span>{' '}
            Works
          </h2>
          <p className="text-gray-600 text-lg">
            Start your agricultural investment journey in four simple steps. 
            We handle the farming while you enjoy the returns.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 hidden lg:block -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-nature-lg transition-all duration-300 text-center relative z-10 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-primary-500 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm shadow-md">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">Ready to start your investment journey?</p>
          <a href="/join" className="btn-primary inline-flex items-center gap-2">
            Get Started Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
