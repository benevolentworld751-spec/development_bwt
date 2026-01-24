import { useState } from "react";

const FlightPackagePage = () => {
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    departureCity: "",
    destinationCity: "",
    travelDate: "",
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flight Booking Submitted:", bookingData);
    alert("Flight booking submitted successfully!");
    setBookingData({
      fullName: "",
      email: "",
      phone: "",
      departureCity: "",
      destinationCity: "",
      travelDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Flight Package Info */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">Premium Flight Package</h1>
        <p className="text-gray-700 mb-2">
          Book your flight with our premium package for a hassle-free travel experience. Includes baggage, meals, and priority check-in.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Airline: XYZ Airlines</li>
          <li>Price: $350</li>
          <li>Travel Class: Economy / Business</li>
          <li>Flexible Dates: Yes</li>
        </ul>
      </div>

      {/* Flight Booking Form */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Book Your Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={bookingData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="tel"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            name="departureCity"
            value={bookingData.departureCity}
            onChange={handleChange}
            placeholder="Departure City"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="text"
            name="destinationCity"
            value={bookingData.destinationCity}
            onChange={handleChange}
            placeholder="Destination City"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="date"
            name="travelDate"
            value={bookingData.travelDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Book Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightPackagePage;
