import React from "react";
import VisaCard from '../components/VisaCard'
import Package from "./PackageLink";

const visas = [
  {
    id: 1,
    country: "United States",
    type: "Tourist",
    duration: "6 Months",
    price: 159999,
    processingTime: "10-15 Days",
    description: "Experience the beauty of America with a hassle-free tourist visa service.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 2,
    country: "United Kingdom",
    type: "Business",
    duration: "6 Months",
    price: 179999,
    processingTime: "12-20 Days",
    description: "For meetings, conferences, and business ventures in the UK.",
    image: "https://w0.peakpx.com/wallpaper/945/791/HD-wallpaper-united-kingdom-london-united-london-kingdom-city.jpg",
  },
  {
    id: 3,
    country: "Canada",
    type: "Student",
    duration: "Up to 4 Years",
    price: 249999,
    processingTime: "20-30 Days",
    description: "Get your student visa and start your educational journey in Canada.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    id: 4,
    country: "Dubai (UAE)",
    type: "Tourist",
    duration: "30 Days",
    price: 179999,
    processingTime: "5-7 Days",
    description: "Apply for Dubai tourist visa quickly and easily.",
    image: "https://images.alphacoders.com/153/thumb-1920-153011.jpg",
  },
  {
    id: 5,
    country: "Australia",
    type: "Tourist",
    duration: "3 Months",
    price: 139999,
    processingTime: "10-20 Days",
    description: "Seamless visa service for exploring Australia’s wonders.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
    {
    id: 6,
    country: "Germany",
    type: "Tourist",
    duration: "3 Months",
    price: 153999,
    processingTime: "10-20 Days",
    description: "Seamless visa service for exploring Australia’s wonders.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuza1XvPf-s9p-ueBFOkCTbtzii_NavbA5A&s",
  },
];

const VisaPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Visa Assistance Services
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We help you with smooth visa processing for your travel, business, or education needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visas.map((visa) => (
            <VisaCard key={visa.id} {...visa} />
          ))}
        </div>
      </div>
      <Package />
    </div>
  );
};

export default VisaPage;
