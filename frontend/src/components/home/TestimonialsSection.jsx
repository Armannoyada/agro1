import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      designation: 'Business Owner',
      location: 'Mumbai, Maharashtra',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: "I've been investing with AgroTech for 2 years now and the returns have been exceptional. The transparency in operations and regular updates give me complete confidence in my investment.",
      service: 'Organic Farming',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      designation: 'IT Professional',
      location: 'Bangalore, Karnataka',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: "As someone working in tech, I appreciate how AgroTech combines technology with traditional farming. The mobile app tracking feature is excellent. My investment has grown 28% in just one year!",
      service: 'Hydroponic Systems',
    },
    {
      id: 3,
      name: 'Amit Patel',
      designation: 'Retired Teacher',
      location: 'Ahmedabad, Gujarat',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5,
      text: "After retirement, I wanted a safe investment with good returns. AgroTech's dairy farming scheme has been providing me consistent monthly income. Highly recommended for retirees!",
      service: 'Dairy Farming',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      designation: 'Doctor',
      location: 'Hyderabad, Telangana',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 5,
      text: "The team at AgroTech is professional and knowledgeable. They guided me through the entire process and my fruit orchard investment is performing beyond expectations.",
      service: 'Fruit Orchards',
    },
    {
      id: 5,
      name: 'Mohammed Khan',
      designation: 'Entrepreneur',
      location: 'Delhi, NCR',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 5,
      text: "What I love about AgroTech is their commitment to sustainable farming. I'm not just earning returns, I'm contributing to a greener planet. The ROI has been consistently above 25%.",
      service: 'Contract Farming',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

        {/* Testimonials Slider */}
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
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-400" fontSize="small" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                    "{testimonial.text}"
                  </p>

                  {/* Service Badge */}
                  <div className="inline-block bg-primary-50 text-primary-600 text-sm px-3 py-1 rounded-full mb-6">
                    {testimonial.service}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.designation}</p>
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
