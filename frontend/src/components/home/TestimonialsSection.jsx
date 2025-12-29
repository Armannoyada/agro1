import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CircularProgress from '@mui/material/CircularProgress';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/Agro/agro1/backend';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/testimonials.php`);
        const result = await response.json();
        if (result.success && result.data) {
          setTestimonials(result.data);
        } else {
          setError('Failed to load testimonials');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, testimonials.length),
    slidesToScroll: 1,
    autoplay: testimonials.length > 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, testimonials.length),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Don't render the section if there are no testimonials and it's not loading
  if (!loading && testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-primary-50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
            What Our{' '}
            <span className="gradient-text">Investors Say</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it. Hear from our satisfied investors
            who have experienced the AgroTech difference.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <CircularProgress sx={{ color: '#2e7d32' }} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 text-gray-500">
            <p>{error}</p>
          </div>
        )}

        {/* Testimonials Slider */}
        {!loading && !error && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-4 pb-8">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-nature-lg transition-all duration-300 h-full relative">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-primary-100">
                      <FormatQuoteIcon style={{ fontSize: 60 }} />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <StarIcon key={i} className="text-yellow-400" fontSize="small" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Service Badge - only show if service_id exists */}
                    {testimonial.service_name && (
                      <div className="inline-block bg-primary-50 text-primary-600 text-sm px-3 py-1 rounded-full mb-6">
                        {testimonial.service_name}
                      </div>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2e7d32&color=fff`}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary-200"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=2e7d32&color=fff`;
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        {testimonial.designation && (
                          <p className="text-sm text-gray-500">{testimonial.designation}</p>
                        )}
                        {testimonial.company && (
                          <p className="text-xs text-gray-400">{testimonial.company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
