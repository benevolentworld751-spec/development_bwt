import React from "react";
import { Link } from "react-router-dom";

const HolidayCard = ({ image, destination, days, price, description, type }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={destination}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800">{destination}</h3>
        <p className="text-sm text-gray-500 mb-2">{type} Package</p>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
          <p>🕒 {days} Days</p>
          <p className="text-blue-600 font-semibold">
            ₹{price.toLocaleString()} /person
          </p>
        </div>

        <Link
          to="/book-holiday"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HolidayCard;
