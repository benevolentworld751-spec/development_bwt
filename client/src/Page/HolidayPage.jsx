import React from "react";
import HolidayCard from '../components/HolidayCard';
import Package from "./PackageLink";

const holidayPackages = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    days: 6,
    price: 49999,
    type: "Honeymoon",
    description:
      "Experience the beauty of Bali’s beaches, temples, and tropical forests with luxury resorts and private pool villas.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    destination: "Dubai, UAE",
    days: 5,
    price: 58999,
    type: "Luxury",
    description:
      "Explore the glamour of Dubai with desert safaris, Burj Khalifa visit, shopping festivals, and fine dining.",
    image: "https://media.gettyimages.com/id/157604370/photo/downtown-dubai.jpg?s=612x612&w=gi&k=20&c=FbYvyk00eXsCwpsUCxxIykU04k87vQXEFDcs_TM2DKw=",
  },
  {
    id: 3,
    destination: "Goa, India",
    days: 4,
    price: 15999,
    type: "Beach",
    description:
      "Unwind at Goa’s sandy beaches with water sports, nightlife, seafood, and stunning sunsets.",
    image: "https://www.accurateholiday.com/img/goa-tour-package-header.jpg",
  },
  {
    id: 4,
    destination: "Switzerland",
    days: 7,
    price: 189999,
    type: "Adventure",
    description:
      "Enjoy a scenic escape through the Swiss Alps with mountain train rides, skiing, and serene lakes.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 5,
    destination: "Maldives",
    days: 5,
    price: 99999,
    type: "Honeymoon",
    description:
      "Relax in overwater villas surrounded by turquoise waters and coral reefs in the Maldives.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  {
    id: 6,
    destination: "Kashmir, India",
    days: 5,
    price: 24999,
    type: "Family",
    description:
      "Discover the paradise of Kashmir with houseboat stays, gardens, and snowy mountains.",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
  },
];

const HolidayPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Holiday Packages
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our best-selling holiday packages with breathtaking destinations.  
          Whether it's beaches, mountains, or cities — Benevolent World Travel has it all!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {holidayPackages.map((pkg) => (
            <HolidayCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
      <Package />
    </div>
  );
};

export default HolidayPage;
