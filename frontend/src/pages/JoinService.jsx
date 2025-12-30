import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import toast from 'react-hot-toast';
import { TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress } from '@mui/material';
import { submitServiceInquiry, getServices } from '../services/api';

const JoinService = () => {
  const { serviceId } = useParams();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    service: serviceId || '',
    investmentAmount: '',
    message: '',
    termsAccepted: false,
  });

  // Fetch services from API on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        if (response.success && response.data) {
          setServices(response.data);
          // If serviceId is provided, pre-select it
          if (serviceId) {
            setFormData(prev => ({ ...prev, service: serviceId }));
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  // Investment ranges (can be made dynamic later if needed)
  const investmentRanges = [
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-250000', label: '₹1,00,000 - ₹2,50,000' },
    { value: '250000-500000', label: '₹2,50,000 - ₹5,00,000' },
    { value: '500000-1000000', label: '₹5,00,000 - ₹10,00,000' },
    { value: '1000000+', label: '₹10,00,000+' },
  ];

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu',
    'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Uttar Pradesh', 'Bihar',
    'West Bengal', 'Punjab', 'Haryana', 'Delhi', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error('Please fill all required fields');
        return;
      }
    } else if (step === 2) {
      if (!formData.address || !formData.city || !formData.state) {
        toast.error('Please fill all required fields');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Get selected service - compare as strings since dropdown value is string
      const selectedService = services.find(s => String(s.id) === formData.service);

      // Prepare data for API
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service_id: formData.service ? parseInt(formData.service) : null,
        service_title: selectedService?.title || 'General Inquiry',
        investment_amount: formData.investmentAmount || null,
      };

      console.log('Submitting payload:', payload);

      const response = await submitServiceInquiry(payload);
      console.log('API Response:', response);

      if (response.success) {
        toast.success('Application submitted successfully! Our team will contact you soon.');
        setStep(4); // Success step
      } else {
        toast.error(response.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      console.error('Error response:', error.response);
      // Show the actual error message from the backend
      const errorMessage = error.response?.data?.error || error.message || 'Failed to submit application. Please try again.';
      const debugMessage = error.response?.data?.debug;

      if (debugMessage) {
        console.error('Backend debug message:', debugMessage);
        toast.error(`${errorMessage}\n\nDebug: ${debugMessage}`);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'No hidden fees or charges',
    'Secure and insured investment',
    'Monthly profit distribution',
    'Real-time investment tracking',
    'Dedicated relationship manager',
    'Easy withdrawal process',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-10 sm:py-12 md:py-16 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden px-4">
        <div className="hidden sm:block absolute top-0 right-0 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              Join Our Services
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 sm:mb-6">
              Start Your <span className="gradient-text">Investment Journey</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Fill out the form below to join our agricultural investment program.
              Our team will review your application and get in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 px-4 md:px-8" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
                {/* Progress Steps - Clean 1-2-3 Design */}
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  {[
                    { num: 1, label: 'Personal' },
                    { num: 2, label: 'Address' },
                    { num: 3, label: 'Investment' }
                  ].map((s, index) => (
                    <div key={s.num} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${step > s.num
                            ? 'bg-gradient-to-br from-primary-500 to-green-500 text-white shadow-lg'
                            : step === s.num
                              ? 'bg-gradient-to-br from-primary-500 to-green-500 text-white shadow-lg ring-4 ring-primary-100'
                              : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                          }`}>
                          {step > s.num ? <CheckCircleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} /> : s.num}
                        </div>
                        <span className={`mt-2 text-xs sm:text-sm font-medium transition-colors ${step >= s.num ? 'text-primary-600' : 'text-gray-400'
                          }`}>
                          {s.label}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`w-12 sm:w-20 md:w-24 h-1 mx-2 sm:mx-3 rounded-full mb-6 transition-all duration-300 ${step > s.num
                            ? 'bg-gradient-to-r from-primary-500 to-green-500'
                            : 'bg-gray-200'
                          }`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {step === 4 ? (
                  // Success Message
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <CheckCircleIcon className="text-primary-500" sx={{ fontSize: { xs: 40, sm: 60 } }} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
                      Application Submitted Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                      Thank you for your interest in AgroTech. Our investment advisor will
                      contact you within 24 hours to discuss your investment options.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <Link to="/" className="btn-primary text-sm sm:text-base py-2.5 sm:py-3">
                        Go to Home
                      </Link>
                      <Link to="/services" className="btn-secondary text-sm sm:text-base py-2.5 sm:py-3">
                        Explore Services
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                            <PersonIcon className="text-primary-600" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-900">
                              Personal Information
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Tell us about yourself</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <TextField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                          />
                          <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                          />
                        </div>

                        <TextField
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          fullWidth
                          variant="outlined"
                          placeholder="+91 9876543210"
                        />
                      </motion.div>
                    )}

                    {/* Step 2: Address */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                            <LocationOnIcon className="text-primary-600" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-900">
                              Address Details
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Where should we contact you?</p>
                          </div>
                        </div>

                        <TextField
                          label="Full Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          fullWidth
                          variant="outlined"
                          multiline
                          rows={2}
                        />

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                          <TextField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                          />
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>State</InputLabel>
                            <Select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              label="State"
                              required
                            >
                              {states.map((state) => (
                                <MenuItem key={state} value={state}>{state}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            label="PIN Code"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Investment Details */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                            <MonetizationOnIcon className="text-primary-600" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-900">
                              Investment Preferences
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">Tell us about your investment goals</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Select Service</InputLabel>
                            <Select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              label="Select Service"
                              required
                              disabled={servicesLoading}
                            >
                              {servicesLoading ? (
                                <MenuItem disabled>Loading services...</MenuItem>
                              ) : services.length === 0 ? (
                                <MenuItem disabled>No services available</MenuItem>
                              ) : (
                                services.map((service) => (
                                  <MenuItem key={service.id} value={String(service.id)}>
                                    {service.title}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Investment Range</InputLabel>
                            <Select
                              name="investmentAmount"
                              value={formData.investmentAmount}
                              onChange={handleChange}
                              label="Investment Range"
                              required
                            >
                              {investmentRanges.map((range) => (
                                <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>

                        <TextField
                          label="Additional Message (Optional)"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          fullWidth
                          variant="outlined"
                          multiline
                          rows={3}
                          placeholder="Any specific requirements or questions?"
                        />

                        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          />
                          <label className="text-xs sm:text-sm text-gray-600">
                            I agree to the{' '}
                            <a href="#" className="text-primary-600 hover:underline">Terms & Conditions</a>
                            {' '}and{' '}
                            <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                            . I understand that this is an application and not a confirmation of investment.
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
                        >
                          Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="ml-auto btn-primary text-sm sm:text-base py-2.5 sm:py-3"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="ml-auto btn-primary flex items-center gap-2 disabled:opacity-50 text-sm sm:text-base py-2.5 sm:py-3"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <SendIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Why Join Card */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4">
                  Why Invest with Us?
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 sm:gap-3">
                      <CheckCircleIcon sx={{ fontSize: { xs: 16, sm: 20 } }} className="text-primary-200" />
                      <span className="text-primary-50 text-sm sm:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <SecurityIcon className="text-green-600" sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-semibold text-gray-900">
                    100% Secure
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Your information is encrypted and secure. We never share your
                  personal data with third parties.
                </p>
              </div>

              {/* Help Card */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-display font-semibold text-gray-900 mb-2 sm:mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Our investment advisors are ready to assist you with any questions.
                </p>
                <div className="space-y-2">
                  <a href="tel:+919876543210" className="flex items-center gap-2 text-primary-600 hover:underline text-sm sm:text-base">
                    <PhoneIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                    +91 9876543210
                  </a>
                  <a href="mailto:invest@agrotech.com" className="flex items-center gap-2 text-primary-600 hover:underline text-sm sm:text-base">
                    <EmailIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                    invest@agrotech.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinService;
