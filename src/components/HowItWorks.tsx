import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight, BarChart3, Shield } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    title: 'Generate Credits',
    description: 'Create carbon credits from verified environmental projects',
  },
  {
    icon: Shield,
    title: 'Tokenize Assets',
    description: 'Convert carbon credits into blockchain tokens using Hedera',
  },
  {
    icon: BarChart3,
    title: 'Trade & Track',
    description: 'Buy, sell, and monitor your carbon credit portfolio',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-gray-700 p-8 rounded-xl">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-green-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;