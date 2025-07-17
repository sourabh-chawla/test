import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    title: 'Transparent Tracking',
    description: 'Real-time monitoring of carbon credit lifecycle on Hedera',
  },
  {
    title: 'Instant Settlement',
    description: 'Quick and secure transactions with immediate settlement',
  },
  {
    title: 'Global Access',
    description: 'Connect with carbon credit markets worldwide',
  },
  {
    title: 'Regulatory Compliance',
    description: 'Meet international environmental standards',
  },
];

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Benefits of GreenToken Hub
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start space-x-4"
            >
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;