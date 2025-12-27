import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import toast from 'react-hot-toast';
import { useCompany } from '../context/CompanyContext';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const { getContactInfo } = useCompany();
  const contactInfo = getContactInfo();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Build full address
  const getFullAddress = () => {
    if (!contactInfo) return ['123 Green Valley, Agriculture Hub', 'Mumbai, Maharashtra 400001'];
    const line1 = contactInfo.address || '123 Green Valley, Agriculture Hub';
    const line2 = [contactInfo.city, contactInfo.state, contactInfo.pincode].filter(Boolean).join(', ') || 'Mumbai, Maharashtra 400001';
    return [line1, line2];
  };

  const addressLines = getFullAddress();

  // Gradient colors for cards
  const cardGradients = [
    'from-blue-500 to-indigo-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600'
  ];

  const contactInfoCards = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: 'Visit Us',
      details: addressLines,
      gradient: cardGradients[0]
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: 'Call Us',
      details: [
        contactInfo?.phone || '+91 9876543210',
        contactInfo?.alternatePhone || ''
      ].filter(Boolean),
      gradient: cardGradients[1]
    },
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: 'Email Us',
      details: [
        contactInfo?.email || 'info@agrotech.com',
        contactInfo?.supportEmail || ''
      ].filter(Boolean),
      gradient: cardGradients[2]
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      title: 'Working Hours',
      details: [
        contactInfo?.workingHours || 'Mon - Sat: 9:00 AM - 6:00 PM',
        'Sunday: Closed'
      ],
      gradient: cardGradients[3]
    },
  ];

  // WhatsApp link
  const whatsappNumber = contactInfo?.whatsapp?.replace(/\D/g, '') || '919876543210';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="bg-white">
      {/* Hero Section - Full Width Image */}
      <section className="relative min-h-[450px] md:min-h-[500px] pb-20" ref={heroRef}>
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative flex items-center justify-center min-h-[350px]">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                We're Here to Help
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Get in <span className="text-primary-400">Touch</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Have questions about our services or want to start investing?
                We'd love to hear from you. Reach out and we'll respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Floating Contact Cards */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {contactInfoCards.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center h-full">
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating cards */}
      <div className="h-28 md:h-32 bg-white"></div>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50" ref={ref}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Contact Form
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Send Us a <span className="gradient-text">Message</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - Takes more space */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-900 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <SendIcon fontSize="small" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar - Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-64 border border-gray-100">
                {contactInfo?.mapEmbed ? (
                  <div dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbed }} className="w-full h-full" />
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703423456789!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                )}
              </div>

              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-green-500 rounded-3xl p-8 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <WhatsAppIcon sx={{ fontSize: 28 }} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    Need Quick Assistance?
                  </h3>
                  <p className="text-primary-100 mb-6 text-sm">
                    Connect with us directly on WhatsApp for instant support.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <WhatsAppIcon />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                    <QuestionAnswerIcon sx={{ fontSize: 20 }} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900">
                    Quick FAQs
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">What is the minimum investment?</p>
                    <p className="text-sm text-gray-600">Starts from ₹30,000 depending on the service.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">How are returns distributed?</p>
                    <p className="text-sm text-gray-600">Monthly payouts directly to your bank account.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">Is my investment secure?</p>
                    <p className="text-sm text-gray-600">100% secured with legal agreements and insurance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500/20 rounded-full blur-3xl"></div>

              <div className="relative grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    Prefer to Talk? Our Team is Ready!
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Call us directly or schedule a callback. We're available Mon-Sat, 9 AM - 6 PM.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-4">
                  <a
                    href={`tel:${contactInfo?.phone || '+919876543210'}`}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <HeadsetMicIcon />
                    Call Now
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                  >
                    <SupportAgentIcon />
                    Request Callback
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

export default Contact;
