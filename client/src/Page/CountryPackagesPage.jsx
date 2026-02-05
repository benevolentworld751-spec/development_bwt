import { useParams } from "react-router-dom";
import { useState } from "react";
import { packageImages } from "../datas/packageImages";
import PDFModal from "../components/PDFModal";

const CountryPackagesPage = () => {
  const { country } = useParams(); // georgia, armenia, azerbaijan
  const [activePackageFiles, setActivePackageFiles] = useState([]);
  const [activeImages, setActiveImages] = useState([]);
  const [tourName, setTourName] = useState("");

  const countryPackages = packageImages[country] || [];
  if (!countryPackages.length)
    return <p className="text-center mt-10">No packages found</p>;

  // Step 1: click package → show list of files
  const handleViewPackage = (pkg) => {
    setActivePackageFiles([pkg]);
    setTourName(pkg.title);
  };

  // Step 2: click file → show modal
  const handleOpenFile = (pkgFile) => {
    setActiveImages(pkgFile.images);
  };

  const handleCloseModal = () => {
    setActiveImages([]);
    setActivePackageFiles([]);
  };

  return (
    <div className="container mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold capitalize mb-8">{country} Tour Packages</h1>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {countryPackages.map((pkg) => (
          <button
            key={pkg.slug}
            onClick={() => handleViewPackage(pkg)}
            className="p-4 bg-white shadow rounded-lg text-left hover:bg-gray-100"
          >
            📌 {pkg.title}
          </button>
        ))}
      </div>

      {/* Step 1: list of package files */}
      {activePackageFiles.length > 0 && !activeImages.length && (
        <div className="mt-6 max-w-md mx-auto p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-4">{tourName} - Select File</h2>
          <ul className="space-y-2">
            {activePackageFiles.map((pkgFile) => (
              <li key={pkgFile.slug}>
                <button
                  onClick={() => handleOpenFile(pkgFile)}
                  className="w-full text-left p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  📄 {pkgFile.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 2: modal */}
      {activeImages.length > 0 && (
        <PDFModal images={activeImages} tourName={tourName} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CountryPackagesPage;
