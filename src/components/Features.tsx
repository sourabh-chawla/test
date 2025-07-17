import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Shield, Globe } from 'lucide-react';
import type { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Immutable Carbon Tracking',
    description: 'Track carbon credits with unprecedented transparency using blockchain technology',
    icon: LineChart,
  },
  {
    title: 'Transparent Marketplace',
    description: 'Trade carbon credits in a secure and transparent environment',
    icon: Shield,
  },
  {
    title: 'Global ESG Compliance',
    description: 'Meet environmental, social, and governance standards worldwide',
    icon: Globe,
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Why Choose GreenToken Hub?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-700 p-8 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;