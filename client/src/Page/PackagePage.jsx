import React from "react";
import { motion } from "framer-motion";
import PackageCard from "../components/PackageCard";
import { Link } from "react-router-dom";
import Package from "./PackageLink";

// Sample data (you can replace with API later)
const packages = [
  {
    id: 1,
    title: "Maldives Getaway",
    location: "Maldives",
    duration: "5 Days / 4 Nights",
    price: 89999,
    description:
      "Experience paradise with crystal-clear waters and luxurious villas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: 129999,
    description:
      "Breathtaking views, cozy chalets, and mountain adventures await you.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 3,
    title: "Dubai Luxury Tour",
    location: "Dubai, UAE",
    duration: "4 Days / 3 Nights",
    price: 75999,
    description: "Luxury shopping, desert safari, and stunning skyscrapers.",
    image: "https://images.alphacoders.com/153/thumb-1920-153011.jpg",
  },
  {
    id: 4,
    title: "Bali Cultural Escape",
    location: "Bali, Indonesia",
    duration: "6 Days / 5 Nights",
    price: 67999,
    description:
      "Immerse yourself in the culture, temples, and tropical beaches of Bali.",
    image:
      "https://bali.com/wp-content/uploads/2024/04/pura-ulun-bratan-temple-bali-1280.webp",
  },
  {
    id: 5,
    title: "Kashmir Luxury Tour",
    location: "Kashmir, India",
    duration: "4 Days / 3 Nights",
    price: 16999,
    description:
      "Snowy mountains, houseboats, and the serenity of Dal Lake await you.",
    image: "https://in.musafir.com/uploads/5_4_d115f28046.webp",
  },
  {
    id: 6,
    title: "Manali Tour",
    location: "Himachal Pradesh, India",
    duration: "6 Days / 5 Nights",
    price: 9999,
    description:
      "Enjoy the scenic valleys, waterfalls, and adventure sports of Manali.",
    image:
      "https://discoverkullumanali.in/wp-content/uploads/2024/03/Discover-Kullu-Manali-Home-Page-banner-1140x530.jpg",
  },
];

const PackagesPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
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
