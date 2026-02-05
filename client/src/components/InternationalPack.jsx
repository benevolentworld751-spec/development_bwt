import React, { useState } from "react";
import { motion } from "framer-motion";
import InternationalCard from "../components/InternationalCard"; // Keep your existing card
import PDFModal from "../components/PDFModal"; // Keep your existing PDF modal
import { packages } from "../datas/packages"; // Ensure this imports the Country-level data (Generic slugs)
import { packageImages } from "../datas/packageImages"; // The detail data

// --- New Component: Modal to select a specific file/tour ---
const FileSelectionModal = ({ countryName, tours, onClose, onSelectTour }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-bold">Select {countryName} Package</h2>
          <button onClick={onClose} className="text-white hover:bg-blue-700 p-1 rounded-full">
            ✕
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {tours && tours.length > 0 ? (
            <div className="space-y-3">
              {tours.map((tour) => (
                <div 
                  key={tour.id}
                  onClick={() => onSelectTour(tour)}
                  className="flex items-center p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all group"
                >
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    📄
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{tour.title}</h3>
                    <p className="text-xs text-gray-500">Click to view brochure</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No packages available yet.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const InternationalPack = () => {
  // State for the List Modal (Step 1)
  const [selectedCountryList, setSelectedCountryList] = useState({
    isOpen: false,
    countryName: "",
    tours: []
  });

  // State for the PDF View Modal (Step 2)
  const [pdfViewer, setPdfViewer] = useState({
    isOpen: false,
    images: [],
    tourName: ""
  });

  // 1. Handle clicking the Main Card (Georgia, Armenia, etc.)
  const handleCountryClick = (pkg) => {
    // pkg.slug should be 'georgia', 'armenia', etc.
    const countryKey = pkg.slug.toLowerCase(); 
    const countryTours = packageImages[countryKey] || [];

    setSelectedCountryList({
      isOpen: true,
      countryName: pkg.location,
      tours: countryTours
    });
  };

  // 2. Handle clicking a specific file in the List Modal
  const handleTourSelect = (tour) => {
    // Close the list modal
    setSelectedCountryList(prev => ({ ...prev, isOpen: false }));
    
    // Open the PDF modal
    setPdfViewer({
      isOpen: true,
      images: tour.images,
      tourName: tour.title
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <motion.h1
          className="text-7xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          International Travel Packages
        </motion.h1>
          <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Caucasus Mountain Travel Packages
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Pass the function to open the List Modal */}
              <InternationalCard
                {...pkg}
                onView={() => handleCountryClick(pkg)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Select File List */}
      {selectedCountryList.isOpen && (
        <FileSelectionModal 
          countryName={selectedCountryList.countryName}
          tours={selectedCountryList.tours}
          onClose={() => setSelectedCountryList({ ...selectedCountryList, isOpen: false })}
          onSelectTour={handleTourSelect}
        />
      )}

      {/* MODAL 2: View Images (PDF Style) */}
      {pdfViewer.isOpen && (
        <PDFModal
          images={pdfViewer.images}
          tourName={pdfViewer.tourName}
          onClose={() => setPdfViewer({ ...pdfViewer, isOpen: false })}
        />
      )}
    </div>
  );
};

export default InternationalPack;