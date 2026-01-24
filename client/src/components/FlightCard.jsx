import React from "react";
import { Link } from "react-router-dom";

const FlightCard = ({ airline, from, to, duration, price, image, stops, type }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={airline} className="w-full h-48 object-cover" />

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800">{airline}</h3>
        <p className="text-gray-500 mb-2 text-sm">{type} Flight</p>

        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <p>From: <span className="font-medium text-gray-800">{from}</span></p>
          <p>To: <span className="font-medium text-gray-800">{to}</span></p>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          ⏱ Duration: {duration} | 🛑 {stops} stops
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="text-blue-600 font-semibold">
            ₹{price.toLocaleString()} <span className="text-gray-500 text-sm">/ ticket</span>
          </p>

          <Link
            to="/book-flight"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Book Flight
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
