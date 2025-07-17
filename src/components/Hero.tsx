import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {

  const navigate = useNavigate();

  const handleLaunchClick = () => {
    navigate("/dapp"); // Navigate to /app
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source
          src="https://player.vimeo.com/external/517090081.hd.mp4?s=0a9e4f196270c7edf0d89c63dd4262ef6ed1c976&profile_id=175&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          Tokenizing Sustainability
          <span className="block text-green-400">for a Greener Tomorrow!</span>
        </h1>
        <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Join the revolution in carbon credit trading with blockchain technology
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button onClick={handleLaunchClick} className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105">
            Start Tokenizing
            <ArrowRight className="w-5 h-5" />
          </button>
          {/* <button className="px-8 py-4 border-2 border-white text-white rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            Learn How It Works
            <Play className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;