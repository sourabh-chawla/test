import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import Impact from '../components/Impact';
import Testimonials from '../components/Testimonials';
// import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Benefits />
      <Impact />
      <Testimonials />
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
};

export default Landing;