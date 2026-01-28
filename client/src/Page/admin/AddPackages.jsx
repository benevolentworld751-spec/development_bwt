// 1️⃣ AddPackages.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const AddPackages = () => {
  const [formData, setFormData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageImages: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, packageImages: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.packageImages.length) return toast.error("Upload at least 1 image");
    if (
      !formData.packageName ||
      !formData.packageDescription ||
      !formData.packageDestination ||
      !formData.packageAccommodation ||
      !formData.packageTransportation ||
      !formData.packageMeals ||
      !formData.packageActivities ||
      !formData.packagePrice
    )
      return toast.error("All fields are required!");
    if (formData.packagePrice < 500) return toast.error("Price must be > 500");
    if (formData.packageOffer && formData.packageDiscountPrice >= formData.packagePrice)
      return toast.error("Discount must be less than price");

    try {
      setIsUploading(true);
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "packageImages") data.append(key, value);
      });
      formData.packageImages.forEach((img) => data.append("packageImages", img));

      const res = await axios.post(`${API_URL}/api/package/create-package`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast[res.data?.success ? "success" : "error"](res.data?.message);
      setIsUploading(false);
      setLoading(false);
      if (res.data?.success) navigate("/admin/packages");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      setIsUploading(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[70%] bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl text-center font-semibold">Add Package</h1>

        <input
          type="text"
          id="packageName"
          placeholder="Package Name"
          value={formData.packageName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          id="packageDescription"
          placeholder="Description"
          value={formData.packageDescription}
          onChange={handleChange}
          className="border p-2 rounded w-full resize-none"
        />
        <input
          type="text"
          id="packageDestination"
          placeholder="Destination"
          value={formData.packageDestination}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <input
            type="number"
            id="packageDays"
            value={formData.packageDays}
            onChange={handleChange}
            placeholder="Days"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            id="packageNights"
            value={formData.packageNights}
            onChange={handleChange}
            placeholder="Nights"
            className="border p-2 rounded w-full"
          />
        </div>
        <textarea
          id="packageAccommodation"
          placeholder="Accommodation"
          value={formData.packageAccommodation}
          onChange={handleChange}
          className="border p-2 rounded w-full resize-none"
        />
        <select
          id="packageTransportation"
          value={formData.packageTransportation}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Transportation</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
          <option value="Boat">Boat</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          id="packageMeals"
          placeholder="Meals"
          value={formData.packageMeals}
          onChange={handleChange}
          className="border p-2 rounded w-full resize-none"
        />
        <textarea
          id="packageActivities"
          placeholder="Activities"
          value={formData.packageActivities}
          onChange={handleChange}
          className="border p-2 rounded w-full resize-none"
        />
        <input
          type="number"
          id="packagePrice"
          placeholder="Price"
          value={formData.packagePrice}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="packageOffer"
            checked={formData.packageOffer}
            onChange={handleChange}
          />
          <label>Offer?</label>
        </div>
        {formData.packageOffer && (
          <input
            type="number"
            id="packageDiscountPrice"
            placeholder="Discount Price"
            value={formData.packageDiscountPrice}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        )}
        <input type="file" multiple onChange={handleFile} className="border p-2 rounded w-full" />
        <button
          type="submit"
          disabled={loading || isUploading}
          className="bg-[#EB662B] text-white p-3 rounded hover:opacity-90"
        >
          {isUploading ? "Uploading..." : loading ? "Loading..." : "Create Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackages;
