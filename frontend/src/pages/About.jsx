import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryIcon from '@mui/icons-material/History';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const values = [
    { icon: '🌱', title: 'Sustainability', description: 'We prioritize eco-friendly farming practices that protect our environment.' },
    { icon: '🤝', title: 'Transparency', description: 'Complete visibility into operations and honest communication with investors.' },
    { icon: '💡', title: 'Innovation', description: 'Embracing cutting-edge agro-technology for better yields and efficiency.' },
    { icon: '❤️', title: 'Community', description: 'Supporting local farmers and building strong agricultural communities.' },
  ];

  const teamMembers = [
    {
      name: 'Dr. Ramesh Agarwal',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: '25+ years in agriculture. Former Director at Agricultural Research Institute.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Sunita Sharma',
      role: 'Co-Founder & COO',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'MBA from IIM. 15 years experience in agribusiness management.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Vikram Singh',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      bio: 'Agriculture graduate with expertise in organic farming and supply chain.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Dr. Meera Patel',
      role: 'Chief Technology Officer',
      image: 'https://randomuser.me/api/portraits/women/33.jpg',
      bio: 'PhD in Agricultural Technology. Pioneer in smart farming solutions.',
      linkedin: '#',
      twitter: '#',
    },
  ];

  const timeline = [
    { year: '2009', title: 'Foundation', description: 'AgroTech was founded with a vision to revolutionize agriculture.' },
    { year: '2012', title: 'First 1000 Farmers', description: 'Reached milestone of 1000 partner farmers across 5 states.' },
    { year: '2015', title: 'Organic Certification', description: 'Achieved organic certification for all our farming operations.' },
    { year: '2018', title: 'Technology Integration', description: 'Launched smart farming solutions with IoT and AI integration.' },
    { year: '2021', title: 'Pan India Expansion', description: 'Expanded operations to 15 states with 5000+ investors.' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as the leading agro-tech investment platform in India.' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden" ref={heroRef}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              About Us
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Cultivating <span className="gradient-text">Tomorrow's</span> Agriculture Today
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At AgroTech Solutions, we're on a mission to transform agriculture through innovation, 
              sustainability, and community partnership. For over 15 years, we've been bridging the 
              gap between investors and the farming community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80"
                    alt="Our Story"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
                  <div className="text-4xl font-display font-bold text-primary-600 mb-1">15+</div>
                  <p className="text-gray-600">Years of Excellence in Agriculture</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2009 by Dr. Ramesh Agarwal, a visionary agriculturist, AgroTech Solutions 
                began with a simple idea: make agricultural investment accessible to everyone while 
                supporting sustainable farming practices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                What started as a small initiative with 50 acres and 10 investors has now grown into 
                a nationwide movement spanning 15 states, with over 10,000 acres under cultivation 
                and 5,000+ satisfied investors.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we combine traditional farming wisdom with cutting-edge technology to deliver 
                consistent returns while preserving our planet for future generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-b from-white to-primary-50" ref={missionRef}>
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <EmojiEventsIcon className="text-primary-600" fontSize="large" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize agriculture through technology and provide sustainable farming 
                solutions that benefit investors, farmers, and the environment alike. We strive 
                to create a world where agricultural investment is accessible, transparent, and 
                profitable for everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <GroupsIcon className="text-primary-600" fontSize="large" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted partner in agricultural investments and farming services 
                globally. We envision a future where sustainable agriculture thrives, communities 
                prosper, and investors enjoy the fruits of responsible farming.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Core Values
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
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-nature-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-display font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white" ref={teamRef}>
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
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-nature-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-2">
                        <a href={member.linkedin} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-colors">
                          <LinkedInIcon fontSize="small" />
                        </a>
                        <a href={member.twitter} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-colors">
                          <TwitterIcon fontSize="small" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-colors">
                          <EmailIcon fontSize="small" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-display font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-primary-600 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white" ref={timelineRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HistoryIcon fontSize="small" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200 hidden md:block"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-nature-lg transition-all duration-300">
                      <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {item.year}
                      </span>
                      <h4 className="text-xl font-display font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
