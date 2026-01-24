
import { Link } from "react-router-dom";

const PackageCard = ({ image, title, price, duration, location, description }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{location}</p>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-semibold">
            ₹{price.toLocaleString()} <span className="text-gray-500 text-sm">/ {duration}</span>
          </p>

          <Link
            to="/search"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
