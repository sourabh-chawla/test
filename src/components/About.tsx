import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Revolutionizing Carbon Credits
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              GreenToken Hub is a Hedera-powered marketplace for tokenized carbon credits.
              We're bridging the gap between environmental sustainability and blockchain
              technology to create a more transparent and efficient carbon credit trading system.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-32 h-32 text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;