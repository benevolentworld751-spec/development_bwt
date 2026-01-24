import React from "react";
import BookHolidayForm from "../components/BookHolidayForm";


const BookHolidayPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Book Your Dream Holiday
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Fill in your details below to confirm your holiday booking. Our travel team will contact you soon with itinerary details.
        </p>
          
        <BookHolidayForm  />
       
      </div>
    </div>
  );
};

export default BookHolidayPage;
