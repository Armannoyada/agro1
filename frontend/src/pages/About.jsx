import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedIcon from '@mui/icons-material/Verified';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SpaIcon from '@mui/icons-material/Spa';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getTeamMembers } from '../services/api';

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [storyRef, storyInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Dynamic team members state
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  // Gradient colors for team members
  const memberGradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-pink-600'
  ];

  // Fetch team members from API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamMembers();
        if (response.success && response.data) {
          // Map API data to component format with gradients
          const mappedMembers = response.data.map((member, index) => ({
            id: member.id,
            name: member.name,
            role: member.designation,
            image: member.photo || 'https://via.placeholder.com/300x300?text=No+Photo',
            bio: member.bio || '',
            linkedin: member.linkedin || '#',
            twitter: member.twitter || '#',
            email: member.email || '#',
            gradient: memberGradients[index % memberGradients.length]
          }));
          setTeamMembers(mappedMembers);
        }
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      } finally {
        setTeamLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const values = [
    {
      icon: <SpaIcon sx={{ fontSize: 32 }} />,
      title: 'Sustainability',
      description: 'We prioritize eco-friendly farming practices that protect our environment for future generations.',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 32 }} />,
      title: 'Transparency',
      description: 'Complete visibility into operations and honest communication with all our investors.',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 32 }} />,
      title: 'Innovation',
      description: 'Embracing cutting-edge agro-technology for better yields and operational efficiency.',
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 32 }} />,
      title: 'Community',
      description: 'Supporting local farmers and building strong, prosperous agricultural communities.',
      gradient: 'from-rose-500 to-pink-600',
      bgGradient: 'from-rose-50 to-pink-50'
    },
  ];


  const timeline = [
    { year: '2009', title: 'Foundation', description: 'AgroTech was founded with a vision to revolutionize agriculture.', color: 'from-blue-500 to-indigo-600' },
    { year: '2012', title: 'First 1000 Farmers', description: 'Reached milestone of 1000 partner farmers across 5 states.', color: 'from-green-500 to-emerald-600' },
    { year: '2015', title: 'Organic Certification', description: 'Achieved organic certification for all our farming operations.', color: 'from-amber-500 to-orange-600' },
    { year: '2018', title: 'Technology Integration', description: 'Launched smart farming solutions with IoT and AI integration.', color: 'from-purple-500 to-pink-600' },
    { year: '2021', title: 'Pan India Expansion', description: 'Expanded operations to 15 states with 5000+ investors.', color: 'from-cyan-500 to-blue-600' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as the leading agro-tech investment platform in India.', color: 'from-rose-500 to-red-600' },
  ];

  const stats = [
    { icon: <HistoryIcon sx={{ fontSize: 28 }} />, value: '15+', label: 'Years Experience', gradient: 'from-blue-500 to-indigo-600' },
    { icon: <PeopleIcon sx={{ fontSize: 28 }} />, value: '5000+', label: 'Happy Investors', gradient: 'from-green-500 to-emerald-600' },
    { icon: <AgricultureIcon sx={{ fontSize: 28 }} />, value: '10,000+', label: 'Acres Managed', gradient: 'from-amber-500 to-orange-600' },
    { icon: <PublicIcon sx={{ fontSize: 28 }} />, value: '15', label: 'States Covered', gradient: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Full Width Image */}
      <section className="relative min-h-[600px] md:min-h-[650px] pb-24" ref={heroRef}>
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
          alt="Agricultural Fields"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative flex items-center justify-center min-h-[450px]">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                About AgroTech Solutions
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Cultivating <span className="text-primary-400">Tomorrow's</span>
                <br />
                Agriculture Today
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                For over 15 years, we've been bridging the gap between investors and the farming
                community through innovation, sustainability, and trusted partnerships.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Services
                  <ArrowForwardIcon />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats Cards - Overlapping Hero Bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10" ref={statsRef}>
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-gray-900">{stat.value}</div>
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

      {/* Story Section */}
      <section className="py-16 md:py-24" ref={storyRef}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80"
                    alt="Our Story"
                    className="w-full h-[450px] object-cover"
                  />
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-green-500 rounded-xl flex items-center justify-center text-white">
                      <TrendingUpIcon />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-bold text-gray-900">15+</div>
                      <p className="text-gray-600 text-sm">Years of Excellence</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                      <VerifiedIcon />
                    </div>
                    <div>
                      <div className="text-3xl font-display font-bold text-gray-900">100%</div>
                      <p className="text-gray-600 text-sm">Trusted Platform</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative glow */}
                <div className="absolute -z-10 top-10 left-10 w-full h-full bg-gradient-to-br from-primary-200 to-green-200 rounded-3xl blur-2xl opacity-50"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                Our Story
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                From a <span className="gradient-text">Vision</span> to a <span className="gradient-text">Movement</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Founded in 2009 by Dr. Ramesh Agarwal, a visionary agriculturist, AgroTech Solutions
                began with a simple idea: make agricultural investment accessible to everyone while
                supporting sustainable farming practices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                What started as a small initiative with 50 acres and 10 investors has now grown into
                a nationwide movement spanning 15 states, with over 10,000 acres under cultivation
                and 5,000+ satisfied investors.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, we combine traditional farming wisdom with cutting-edge technology to deliver
                consistent returns while preserving our planet for future generations.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircleIcon className="text-primary-500" />
                  <span className="font-medium">Government Certified</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircleIcon className="text-primary-500" />
                  <span className="font-medium">ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircleIcon className="text-primary-500" />
                  <span className="font-medium">NABARD Partner</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={missionRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Mission</span> & <span className="gradient-text">Vision</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white h-full relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>

                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <EmojiEventsIcon fontSize="large" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  To revolutionize agriculture through technology and provide sustainable farming
                  solutions that benefit investors, farmers, and the environment alike. We strive
                  to create a world where agricultural investment is accessible, transparent, and
                  profitable for everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white h-full relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>

                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <GroupsIcon fontSize="large" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                <p className="text-green-100 leading-relaxed text-lg">
                  To become the most trusted partner in agricultural investments and farming services
                  globally. We envision a future where sustainable agriculture thrives, communities
                  prosper, and investors enjoy the fruits of responsible farming.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white" ref={valuesRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              What We Stand For
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do at AgroTech Solutions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${value.bgGradient} rounded-3xl p-8 text-center h-full border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                  {/* Decorative glow on hover */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-0 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white" ref={teamRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Our Leadership
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Passionate experts dedicated to transforming agriculture and creating value for our investors.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-72 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : teamMembers.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Team Members Yet</h3>
                <p className="text-gray-600">Team members can be added from the Admin Panel.</p>
              </div>
            ) : (
              teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-5`}>
                        <div className="flex gap-2">
                          <a href={member.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                            <LinkedInIcon fontSize="small" />
                          </a>
                          <a href={member.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                            <TwitterIcon fontSize="small" />
                          </a>
                          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors">
                            <EmailIcon fontSize="small" />
                          </a>
                        </div>
                      </div>

                      {/* Role badge */}
                      <div className={`absolute top-4 right-4 bg-gradient-to-r ${member.gradient} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}>
                        {member.role.split(' ')[0]}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-display font-bold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-primary-600 text-sm font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white" ref={timelineRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HistoryIcon fontSize="small" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Milestones & <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-gray-600 text-lg">
              A decade of growth, innovation, and commitment to excellence.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line - Gradient */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 via-amber-500 via-purple-500 to-rose-500 rounded-full hidden md:block"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <span className={`inline-block bg-gradient-to-r ${item.color} text-white px-4 py-1.5 rounded-full text-sm font-bold mb-3 shadow-md`}>
                        {item.year}
                      </span>
                      <h4 className="text-xl font-display font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot - Colored */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg hidden md:block`}></div>
                </motion.div>
              ))}
            </div>
          </div>
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                  Ready to Start Your Investment Journey?
                </h2>
                <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10">
                  Join thousands of investors who trust AgroTech Solutions for sustainable
                  agricultural investments. Start with as little as ₹30,000.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    Explore Services
                    <ArrowForwardIcon />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
