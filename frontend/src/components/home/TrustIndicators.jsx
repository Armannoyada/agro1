import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppGoodIcon from '@mui/icons-material/GppGood';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

const TrustIndicators = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const badges = [
        {
            icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
            title: 'SEBI Compliant',
            description: 'Registered & regulated investment platform',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: <GppGoodIcon sx={{ fontSize: 40 }} />,
            title: 'ISO Certified',
            description: 'Quality management standards',
            color: 'from-green-500 to-green-600',
        },
        {
            icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
            title: 'Government Approved',
            description: 'Ministry of Agriculture recognized',
            color: 'from-amber-500 to-amber-600',
        },
        {
            icon: <LocalPoliceIcon sx={{ fontSize: 40 }} />,
            title: '100% Secure',
            description: 'Bank-grade security & encryption',
            color: 'from-purple-500 to-purple-600',
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <p className="text-gray-400 uppercase tracking-wider text-sm font-medium mb-2">
                        Trusted by 5000+ Investors
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                        Your Investment is <span className="text-primary-400">Safe & Secure</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {badge.icon}
                            </div>
                            <h4 className="text-white font-semibold mb-1">{badge.title}</h4>
                            <p className="text-gray-400 text-sm">{badge.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Numbers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 pt-10 border-t border-gray-700"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-primary-400">₹50Cr+</p>
                            <p className="text-gray-400 mt-1">Returns Generated</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-primary-400">5000+</p>
                            <p className="text-gray-400 mt-1">Happy Investors</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-primary-400">99%</p>
                            <p className="text-gray-400 mt-1">Success Rate</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-bold text-primary-400">0</p>
                            <p className="text-gray-400 mt-1">Default Cases</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TrustIndicators;
