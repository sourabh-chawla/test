import React from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Sustainability Director',
    company: 'EcoTech Solutions',
    content: 'GreenToken Hub has revolutionized how we manage our carbon credits. The transparency and efficiency are unmatched.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Green Future Inc',
    content: `The platform's ease of use and robust features have made carbon credit trading accessible and efficient.`,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Forest Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-700/80 backdrop-blur-sm p-8 rounded-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-300">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;