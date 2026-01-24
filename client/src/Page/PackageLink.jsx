import React from "react";
import { Link } from "react-router-dom";
import { Plane, Car, Globe, Luggage, CreditCard } from "lucide-react";

const Package = () => {
  return (
    <section className="bg-gradient-to-r from-orange-100 via-white to-blue-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          ✈️ Choose Your Travel Package
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Tour */}
          <Link
            to="/package"
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl border border-orange-200 hover:border-blue-400 transition-all duration-300 rounded-2xl p-6 w-40 hover:-translate-y-2"
          >
            <Globe className="text-orange-500 mb-3" size={36} />
            <span className="font-semibold text-gray-700">Tour</span>
          </Link>

          {/* Visa */}
          <Link
            to="/visa-package"
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl border border-orange-200 hover:border-blue-400 transition-all duration-300 rounded-2xl p-6 w-40 hover:-translate-y-2"
          >
            <CreditCard className="text-orange-500 mb-3" size={36} />
            <span className="font-semibold text-gray-700">Visa</span>
          </Link>

          {/* Car */}
          <Link
            to="/car-package"
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl border border-orange-200 hover:border-blue-400 transition-all duration-300 rounded-2xl p-6 w-40 hover:-translate-y-2"
          >
            <Car className="text-orange-500 mb-3" size={36} />
            <span className="font-semibold text-gray-700">Car</span>
          </Link>

          {/* Flight */}
          <Link
            to="/air-package"
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl border border-orange-200 hover:border-blue-400 transition-all duration-300 rounded-2xl p-6 w-40 hover:-translate-y-2"
          >
            <Plane className="text-orange-500 mb-3" size={36} />
            <span className="font-semibold text-gray-700">Flight</span>
          </Link>

          {/* Holiday */}
          <Link
            to="/holiday"
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl border border-orange-200 hover:border-blue-400 transition-all duration-300 rounded-2xl p-6 w-40 hover:-translate-y-2"
          >
            <Luggage className="text-orange-500 mb-3" size={36} />
            <span className="font-semibold text-gray-700">Holidays</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Package;
