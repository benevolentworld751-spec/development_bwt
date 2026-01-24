import { useState } from "react";
import { toast } from "react-toastify";

const BookHolidayForm = ({ packageName ="Maldives"}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: 1,
    startDate: "",
    endDate: "",
    specialRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);

    toast.success("🎉 Your holiday package has been booked successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      travelers: 1,
      startDate: "",
      endDate: "",
      specialRequest: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Book Your Holiday
      </h2>

      <p className="text-center text-gray-600 mb-6">
        You are booking:{" "}
        <span className="text-blue-600 font-medium">{packageName}</span>
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

        {/* Travelers */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Number of Travelers
          </label>
          <input
            type="number"
            name="travelers"
            min="1"
            value={formData.travelers}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
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
            placeholder="Any meal preferences or special assistance?"
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
  );
};

export default BookHolidayForm;
