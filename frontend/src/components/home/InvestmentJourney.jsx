import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const InvestmentJourney = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const steps = [
        {
            step: 1,
            icon: <TouchAppIcon sx={{ fontSize: { xs: 36, md: 48 } }} />,
            title: 'Choose Service',
            subtitle: 'Browse & Select',
            description: 'Explore our diverse agricultural investment options. View ROI, duration, and minimum investment.',
            action: 'View Services',
            actionLink: '/services',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
        },
        {
            step: 2,
            icon: <PaymentsIcon sx={{ fontSize: { xs: 36, md: 48 } }} />,
            title: 'Make Investment',
            subtitle: 'Invest Securely',
            description: 'Complete your investment starting from just ₹30,000. Safe bank transfers and documentation.',
            action: 'Start Investing',
            actionLink: '/join',
            gradient: 'from-emerald-500 to-green-500',
            bgGradient: 'from-emerald-50 to-green-50',
        },
        {
            step: 3,
            icon: <AgricultureIcon sx={{ fontSize: { xs: 36, md: 48 } }} />,
            title: 'We Cultivate',
            subtitle: 'Expert Management',
            description: 'Our agricultural experts manage farming operations with regular updates and progress reports.',
            action: 'Learn More',
            actionLink: '/about',
            gradient: 'from-orange-500 to-amber-500',
            bgGradient: 'from-orange-50 to-amber-50',
        },
        {
            step: 4,
            icon: <AccountBalanceWalletIcon sx={{ fontSize: { xs: 36, md: 48 } }} />,
            title: 'Earn Returns',
            subtitle: 'Guaranteed Profits',
            description: 'Receive monthly returns directly to your bank account. Track your earnings transparently.',
            action: 'Calculate ROI',
            actionLink: '/services',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
        },
    ];

    return (
        <section className="pt-12 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 bg-white relative overflow-hidden" ref={ref}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316a34a" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }}></div>
            </div>

            <div className="container-custom relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-2"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg">
                        <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-white rounded-full animate-pulse"></span>
                        Your Investment Journey
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4 md:mb-6">
                        From <span className="gradient-text">Selection</span> to <span className="gradient-text">Returns</span>
                    </h2>
                    <p className="text-gray-600 text-sm md:text-lg px-2">
                        Experience a seamless investment journey with complete transparency at every step.
                    </p>
                </motion.div>

                {/* Journey Steps */}
                <div className="relative">
                    {/* Desktop Connection Line */}
                    <div className="hidden lg:block absolute top-32 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-purple-500 rounded-full opacity-30"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="relative group"
                            >
                                {/* Step Card */}
                                <div className={`bg-gradient-to-br ${step.bgGradient} rounded-2xl md:rounded-3xl p-5 md:p-8 h-full hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden`}>
                                    {/* Step Number Badge */}
                                    <div className={`absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg`}>
                                        {step.step}
                                    </div>

                                    {/* Decorative Glow */}
                                    <div className={`absolute -bottom-10 -right-10 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg md:shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{step.subtitle}</p>
                                    <h3 className="text-lg md:text-2xl font-display font-bold text-gray-900 mb-2 md:mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Action Button */}
                                    <Link
                                        to={step.actionLink}
                                        className={`inline-flex items-center gap-2 text-xs md:text-sm font-semibold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent hover:gap-3 transition-all`}
                                    >
                                        {step.action}
                                        <ArrowForwardIcon className={`text-sm bg-gradient-to-r ${step.gradient} bg-clip-text`} style={{ fontSize: 14, color: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : index === 2 ? '#f59e0b' : '#a855f7' }} />
                                    </Link>
                                </div>

                                {/* Arrow Connector (Desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-32 -right-4 z-20 items-center justify-center">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${steps[index + 1].gradient} flex items-center justify-center text-white shadow-lg`}>
                                            <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-8 md:mt-10"
                >
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white shadow-2xl">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold mb-3 md:mb-4">
                            Ready to Start Your Investment Journey?
                        </h3>
                        <p className="text-primary-100 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto px-2">
                            Join thousands of investors who are already earning consistent returns through agricultural investments.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-primary-50 transition-colors shadow-lg"
                            >
                                Explore Services
                                <ArrowForwardIcon />
                            </Link>
                            <Link
                                to="/join"
                                className="inline-flex items-center justify-center gap-2 bg-primary-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-primary-800 transition-colors border border-primary-400"
                            >
                                Start Investing Now
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InvestmentJourney;
