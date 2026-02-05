import { useParams } from "react-router-dom";
import { useState } from "react";
import { packages } from "../datas/packages";
import { packageImages } from "../datas/packageImages";
import PDFModal from "../components/PDFModal";

const PackageDetailPage = () => {
  const { slug } = useParams();
  const [activeImages, setActiveImages] = useState([]);
  const [tourName, setTourName] = useState("");

  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return <p className="text-center mt-10">Package not found</p>;

  const country = pkg.location.toLowerCase();
  const imagePack = packageImages[country]?.find((p) => p.slug === slug);

  const handleOpenFile = (filePack) => {
    setActiveImages(filePack.images);
    setTourName(filePack.title);
  };

  const handleCloseModal = () => setActiveImages([]);

  return (
    <div className="container mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
      <p className="text-gray-500 mb-4">{pkg.location}</p>

      <img src={pkg.image} alt={pkg.title} className="w-full max-w-2xl mb-4 rounded-lg" />

      <p className="text-gray-600 mb-4">{pkg.description}</p>
      <p className="text-blue-600 font-semibold mb-6">
        ₹{pkg.price.toLocaleString()} / {pkg.duration}
      </p>

      {imagePack ? (
        <button
          onClick={() => handleOpenFile(imagePack)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          📄 View Package Files
        </button>
      ) : (
        <p className="text-gray-400 mt-6">No brochure available</p>
      )}

      {activeImages.length > 0 && (
        <PDFModal images={activeImages} tourName={tourName} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PackageDetailPage;
