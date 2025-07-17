import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ImpactCounter: React.FC<{ end: number; suffix: string; label: string }> = ({
  end,
  suffix,
  label,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-5xl font-bold text-green-400 mb-2"
        initial={{ number: 0 }}
        animate={inView ? { number: end } : {}}
        transition={{ duration: 2 }}
      >
        {Math.floor(Number(inView ? end : 0)).toLocaleString()}
        {suffix}
      </motion.div>
      <div className="text-gray-300">{label}</div>
    </motion.div>
  );
};

const Impact: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Our Global Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ImpactCounter end={1000000} suffix="t" label="CO2 Offset" />
          <ImpactCounter end={250} suffix="+" label="Projects Supported" />
          <ImpactCounter end={45} suffix="" label="Countries Involved" />
        </div>
      </div>
    </section>
  );
};

export default Impact;