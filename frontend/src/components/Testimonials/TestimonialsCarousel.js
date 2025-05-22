import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TestimonialsCarousel.css'; // Custom styling

const testimonials = [
  {
    title: 'Simple and Fast Process',
    text: 'I chose InsuranceDekho to buy my ICICI Lombard car insurance policy, and I’m so glad I did! The process was quick, straightforward, and completely stress-free.',
    name: 'Nirmala Singh',
    insurance: 'ICICI Lombard car Insurance',
    date: '13th February, 2025',
  },
  {
    title: 'Super Happy with My Experience!',
    text: 'I recently bought my HDFC ERGO car insurance through InsuranceDekho, and I couldn’t be happier! The whole process was smooth, quick, and completely hassle-free.',
    name: 'Apala Pandey',
    insurance: 'HDFC ERGO car Insurance',
    date: '13th February, 2025',
  },
  {
    title: 'Great Support and Assistance',
    text: 'The team at InsuranceDekho helped me find the perfect health insurance plan tailored to my needs. Their support made everything very easy and transparent.',
    name: 'Rajesh Kumar',
    insurance: 'Religare Health Insurance',
    date: '20th March, 2025',
  },
  {
    title: 'Affordable and Reliable',
    text: 'Thanks to InsuranceDekho, I got the best deal on my life insurance policy. The entire process was seamless and saved me a lot of money!',
    name: 'Sneha Patel',
    insurance: 'Max Life Insurance',
    date: '5th April, 2025',
  },
  {
    title: 'Highly Recommend for Bike Insurance',
    text: 'Buying bike insurance through InsuranceDekho was hassle-free. The prices were competitive and the service was excellent throughout.',
    name: 'Ankit Sharma',
    insurance: 'Bajaj Allianz Bike Insurance',
    date: '12th April, 2025',
  },
];

const TestimonialsCarousel = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Centered headings */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Customer's Speak</h1>
  <h2 className="text-0xl font-semibold text-black">
            Know why did they choose InsuranceDekho!
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-md shadow-md h-full relative">
                <FaQuoteLeft className="text-orange-400 text-3xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">{testimonial.title}</h3>
                <p className="text-gray-600">
                  {testimonial.text}{' '}
                  <span className="text-blue-500 cursor-pointer">...Read More</span>
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-1 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="mr-1" />
                  ))}
                </div>
                <h4 className="font-semibold">{testimonial.insurance}</h4>
                <p className="text-gray-600 text-sm">By {testimonial.name}</p>
                <p className="text-gray-500 text-sm">On: {testimonial.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
