import React from "react";
import { Link } from "react-router-dom";
import Package from "./PackageLink";

const carPackages = [
  {
    id: 1,
    name: "Luxury Sedan Ride",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    description:
      "Experience comfort and style with our luxury sedans. Ideal for airport transfers, business meetings, or city tours.",
    price: 27500,
  },
  {
    id: 2,
    name: "SUV Adventure Trip",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    description:
      "Spacious and powerful SUVs perfect for long road trips, family holidays, or exploring off-road destinations.",
    price: 12000,
  },
  {
    id: 3,
    name: "Economy City Ride",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    description:
      "Affordable city rides for quick errands, meetings, or daily travel within your destination city.",
    price: 25000,
  },
];

const CarPackagePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚗 Car Rental & Travel Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our premium car rental packages to explore your dream
            destination with comfort and style.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {pkg.name}
                </h2>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-lg">
                     ₹{pkg.price.toLocaleString()}
                  </span>
                  <Link 
                    to="/car-book"
                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Package />

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Need a Custom Ride?
          </h3>
          <p className="text-gray-600 mb-6">
            Tell us your destination and preferences — we’ll tailor a travel plan just for you.
          </p>
          <Link 
          to="/contact"
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-xl transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarPackagePage;

