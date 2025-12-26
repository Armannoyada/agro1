import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import toast from 'react-hot-toast';
import { useCompany } from '../context/CompanyContext';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
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

  const contactInfoCards = [
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: 'Visit Us',
      details: addressLines,
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: 'Call Us',
      details: [
        contactInfo?.phone || '+91 9876543210',
        contactInfo?.alternatePhone || ''
      ].filter(Boolean),
    },
    {
      icon: <EmailIcon fontSize="large" />,
      title: 'Email Us',
      details: [
        contactInfo?.email || 'info@agrotech.com',
        contactInfo?.supportEmail || ''
      ].filter(Boolean),
    },
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: 'Working Hours',
      details: [
        contactInfo?.workingHours || 'Mon - Sat: 9:00 AM - 6:00 PM',
        'Sunday: Closed'
      ],
    },
  ];

  // WhatsApp link
  const whatsappNumber = contactInfo?.whatsapp?.replace(/\D/g, '') || '919876543210';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Contact Us
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Have questions about our services or want to start investing?
              We'd love to hear from you. Reach out to us and we'll respond as soon as we can.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfoCards.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-nature-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gradient-to-b from-white to-primary-50" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-nature"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-nature"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-nature"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-nature"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-nature resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
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

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-80">
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
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Need Quick Assistance?
                </h3>
                <p className="text-primary-100 mb-6">
                  Connect with us directly on WhatsApp for instant support and quick responses to your queries.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </div>

              {/* FAQ Teaser */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 mb-4">
                  Find answers to common questions about our investment services and processes.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">What is the minimum investment?</p>
                    <p className="text-sm text-gray-600">Starts from ₹30,000 depending on the service.</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">How are returns distributed?</p>
                    <p className="text-sm text-gray-600">Monthly payouts directly to your bank account.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
