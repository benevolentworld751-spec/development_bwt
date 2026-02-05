const PDFModal = ({ images, tourName, onClose }) => {
  const whatsappNumber = "919871047857";
  const message = encodeURIComponent(
    `Hello, I am interested in "${tourName}". Please share details and price.`
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white w-[95%] h-[95%] rounded-lg overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Close
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            WhatsApp Enquiry
          </a>
        </div>

        <div className="space-y-6">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${tourName} page ${index + 1}`}
              className="w-full rounded shadow"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFModal;
