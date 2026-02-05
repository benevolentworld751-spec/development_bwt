import React from "react";
import { motion } from "framer-motion";
import PackageCard from "../components/PackageCard";
import { Link } from "react-router-dom";
import Package from "./PackageLink";

// Sample data (you can replace with API later)
const packages = [
  {
    id: 1,
    title: "Manali Getaway",
    location: "Manali, India",
    duration: "5 Days / 4 Nights",
    price: 29999,
    description:
      "Experience paradise with crystal-clear waters and luxurious villas.",
    image: "https://lifelinetourism.in/wp-content/uploads/2022/05/manali-holiday-package.jpg",
  },
  {
    id: 2,
    title: "Kashmir Adventure",
    location: "Kashmir, India",
    duration: "7 Days / 6 Nights",
    price: 39599,
    description:
      "Breathtaking views, cozy chalets, and mountain adventures await you.",
    image: "https://charzanholidays.com/wp-content/uploads/2024/07/blog-experience-shikara-ride-in-dal-lake-1637909418.jpg",
  },
  {
    id: 3,
    title: "Goa Beach Retreat",
    location: "Goa, India",
    duration: "4 Days / 3 Nights",
    price: 17999,
    description: "Luxury shopping, desert safari, and stunning skyscrapers.",
    image: "https://assets.cntraveller.in/photos/65169715f1f1534fc4e0f24d/4:3/w_1640,h_1230,c_limit/W%20Goa.jpg",
  }, 
];

// More packages can be added here
const PackagesPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
          <motion.h1
          className="text-7xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Domestic Travel Packages In India
        </motion.h1>
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Travel Packages
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose from our carefully curated travel experiences designed to make
          your journey unforgettable.
        </motion.p>

        {/* Animated 2x3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
              }}
            >
              <PackageCard {...pkg} />
            </motion.div>
          ))}
        </div>
      </div>
      <Package />
    
    </div>
  );
};

export default PackagesPage;
