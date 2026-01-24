import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // const handlePlanTripClick = () => {
  //   // Option 1: Scroll to a specific section on the same page
  //   const planTripSection = document.getElementById('plan-trip-section');
  //   if (planTripSection) {
  //     planTripSection.scrollIntoView({ behavior: 'smooth' });
  //   } 
  //   // Option 2 (Alternative): Navigate to a different page/route
  //   // If you're using React Router, you might use:
  //   // history.push('/plan-your-trip');
  //   // For a simple link:
  //   // window.location.href = '/plan-your-trip';
  // };

  return (
    
    <section
        id="home" // ID for Navbar link
      className="
         relative h-screen bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/73/70/00/737000df4b8e04719d38b1b4537ebad2.jpg')" }}
    >  
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-white max-w-4xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fadeInUp">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl mb-8 font-light animate-fadeInUp [animation-delay:0.2s]">
          Discover incredible destinations, unique experiences, and create lasting memories with us.
        </p>
        <Link
        // Added onClick handler
          to="/package"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeInUp [animation-delay:0.4s]"
        >
          Plan Your Trip
        </Link>
      </div>
    </section>
  );
};

export default Hero; 