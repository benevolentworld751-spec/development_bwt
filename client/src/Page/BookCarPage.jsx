import React, { useState } from "react";
import { toast } from "react-toastify";

const BookCarPage = ({ selectedCar = "Luxury Sedan" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    dropDate: "",
    carType: selectedCar,
    specialRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);

    toast.success("🚗 Your car booking request has been submitted!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      pickupLocation: "",
      dropLocation: "",
      pickupDate: "",
      dropDate: "",
      carType: selectedCar,
      specialRequest: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Car Package
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in your trip details to confirm your car rental booking. Our
            travel team will contact you soon with confirmation details.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Car Booking Details
          </h2>

          <p className="text-center text-gray-600 mb-6">
            You are booking:{" "}
            <span className="text-blue-600 font-medium">
              {formData.carType}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Pickup & Drop Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Drop Location
                </label>
                <input
                  type="text"
                  name="dropLocation"
                  value={formData.dropLocation}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Drop Date
                </label>
                <input
                  type="date"
                  name="dropDate"
                  value={formData.dropDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                rows="3"
                placeholder="Any specific car model or assistance?"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookCarPage;
