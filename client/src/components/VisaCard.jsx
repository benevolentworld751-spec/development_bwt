import React from "react";
import { Link } from "react-router-dom";

const VisaCard = ({ country, type, duration, price, image, processingTime, description }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={country} className="w-full h-56 object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{country}</h3>
        <p className="text-gray-500 text-sm mb-2">{type} Visa</p>
        <p className="text-gray-600 mb-3">{description}</p>

        <div className="text-sm text-gray-500 mb-3">
          <p>⏱ Processing Time: <span className="text-gray-700">{processingTime}</span></p>
          <p>📅 Duration: <span className="text-gray-700">{duration}</span></p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-semibold">
            ₹{price.toLocaleString()} <span className="text-gray-500 text-sm">/ person</span>
          </p>

          <Link
            to="/visa-apply"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
