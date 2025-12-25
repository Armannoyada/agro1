import React, { useState } from 'react';
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
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const JoinService = () => {
  const { serviceId } = useParams();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const services = [
    { id: '1', name: 'Organic Farming', minInvestment: 50000 },
    { id: '2', name: 'Hydroponic Systems', minInvestment: 75000 },
    { id: '3', name: 'Dairy Farming', minInvestment: 100000 },
    { id: '4', name: 'Fruit Orchards', minInvestment: 200000 },
    { id: '5', name: 'Mushroom Cultivation', minInvestment: 30000 },
    { id: '6', name: 'Contract Farming', minInvestment: 150000 },
    { id: '7', name: 'Poultry Farming', minInvestment: 80000 },
    { id: '8', name: 'Smart Greenhouse', minInvestment: 150000 },
  ];

  const investmentRanges = [
    '₹30,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000+',
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
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Application submitted successfully! Our team will contact you soon.');
      setLoading(false);
      setStep(4); // Success step
    }, 2000);
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
      <section className="relative py-16 bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
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
              Join Our Services
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Start Your <span className="gradient-text">Investment Journey</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Fill out the form below to join our agricultural investment program. 
              Our team will review your application and get in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step > s ? <CheckCircleIcon /> : s}
                      </div>
                      {s < 3 && (
                        <div className={`w-full h-1 mx-2 ${
                          step > s ? 'bg-primary-500' : 'bg-gray-200'
                        }`} style={{ width: '80px' }}></div>
                      )}
                    </div>
                  ))}
                </div>

                {step === 4 ? (
                  // Success Message
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="text-primary-500" style={{ fontSize: 60 }} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                      Application Submitted Successfully!
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Thank you for your interest in AgroTech. Our investment advisor will 
                      contact you within 24 hours to discuss your investment options.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link to="/" className="btn-primary">
                        Go to Home
                      </Link>
                      <Link to="/services" className="btn-secondary">
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
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <PersonIcon className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-semibold text-gray-900">
                              Personal Information
                            </h3>
                            <p className="text-gray-600 text-sm">Tell us about yourself</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
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
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <LocationOnIcon className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-semibold text-gray-900">
                              Address Details
                            </h3>
                            <p className="text-gray-600 text-sm">Where should we contact you?</p>
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

                        <div className="grid md:grid-cols-3 gap-6">
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
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                            <MonetizationOnIcon className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-semibold text-gray-900">
                              Investment Preferences
                            </h3>
                            <p className="text-gray-600 text-sm">Tell us about your investment goals</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Select Service</InputLabel>
                            <Select
                              name="service"
                              value={formData.service}
                              onChange={handleChange}
                              label="Select Service"
                              required
                            >
                              {services.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                  {service.name} (Min: ₹{service.minInvestment.toLocaleString()})
                                </MenuItem>
                              ))}
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
                                <MenuItem key={range} value={range}>{range}</MenuItem>
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

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                          />
                          <label className="text-sm text-gray-600">
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
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        >
                          Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="ml-auto btn-primary"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="ml-auto btn-primary flex items-center gap-2 disabled:opacity-50"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <SendIcon fontSize="small" />
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
              className="space-y-6"
            >
              {/* Why Join Card */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Why Invest with Us?
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircleIcon fontSize="small" className="text-primary-200" />
                      <span className="text-primary-50">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <SecurityIcon className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-gray-900">
                    100% Secure
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Your information is encrypted and secure. We never share your 
                  personal data with third parties.
                </p>
              </div>

              {/* Help Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our investment advisors are ready to assist you with any questions.
                </p>
                <div className="space-y-2">
                  <a href="tel:+919876543210" className="flex items-center gap-2 text-primary-600 hover:underline">
                    <PhoneIcon fontSize="small" />
                    +91 9876543210
                  </a>
                  <a href="mailto:invest@agrotech.com" className="flex items-center gap-2 text-primary-600 hover:underline">
                    <EmailIcon fontSize="small" />
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
