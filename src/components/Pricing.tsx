import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '499',
    features: [
      'Basic carbon credit trading',
      'Standard reporting',
      'Email support',
      '100 credits per month',
    ],
  },
  {
    name: 'Professional',
    price: '999',
    features: [
      'Advanced trading features',
      'Real-time analytics',
      'Priority support',
      'Unlimited credits',
      'API access',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Custom solutions',
      'Dedicated account manager',
      'White-label options',
      'Custom API integration',
      '24/7 phone support',
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Simple, Transparent Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`rounded-xl p-8 ${
                plan.highlighted
                  ? 'bg-green-500 transform scale-105'
                  : 'bg-gray-800'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-gray-300">/month</span>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <Check
                      className={`w-5 h-5 ${
                        plan.highlighted ? 'text-white' : 'text-green-400'
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? 'text-white' : 'text-gray-300'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-green-500 hover:bg-gray-100'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;