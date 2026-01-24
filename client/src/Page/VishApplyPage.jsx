import { useState } from "react";

const VisaApplyPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to your backend API
    console.log("Visa Application Submitted:", formData);
    alert("Visa application submitted successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      passportNumber: "",
      country: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Visa Package Info */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">Premium Visa Package</h1>
        <p className="text-gray-700 mb-2">
          Apply for a hassle-free visa with our Premium Visa Package. Includes
          expert assistance, document verification, and fast processing.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Processing Time: 5-7 business days</li>
          <li>Cost: $120</li>
          <li>24/7 Support during application</li>
        </ul>
      </div>

      {/* Visa Application Form */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Apply for Visa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Country to Visit</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisaApplyPage;