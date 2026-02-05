import React from "react";

const InternationalCard = ({ image, title, price, duration, location, onView }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{location}</p>
        <p className="text-gray-600 mb-4">{duration}</p>
        <p className="text-blue-600 font-semibold mb-4">₹{price.toLocaleString()}</p>
        <button
          onClick={onView}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          View Packages
        </button>
      </div>
    </div>
  );
};

export default InternationalCard;
