// 2️⃣ UpdatePackage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const UpdatePackage = () => {
  const params = useParams();
  const navigate = useNavigate();
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPackageData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/package/get-package-data/${params?.id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data?.success) {
        setFormData({ ...data.packageData });
      } else {
        toast.error(data?.message || "Failed to fetch package data");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (params.id) getPackageData();
  }, [params.id]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length + formData.packageImages.length > 10) {
      return toast.error("Max 10 images allowed");
    }
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.packageImages.length) return toast.error("Upload at least 1 image");

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "packageImages") data.append(key, value);
      });
      formData.packageImages.forEach((img) => data.append("packageImages", img));
      images.forEach((img) => data.append("packageImages", img));

      const res = await axios.post(`${API_URL}/api/package/update-package/${params?.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast[res.data?.success ? "success" : "error"](res.data?.message);
      if (res.data?.success) navigate(`/package/${params?.id}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[60%] bg-white p-4 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-center text-2xl font-semibold">Update Package</h1>
        <input type="text" id="packageName" value={formData.packageName} onChange={handleChange} placeholder="Name" className="border p-2 rounded w-full" />
        <textarea id="packageDescription" value={formData.packageDescription} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full resize-none" />
        <input type="text" id="packageDestination" value={formData.packageDestination} onChange={handleChange} placeholder="Destination" className="border p-2 rounded w-full" />
        <div className="flex gap-2">
          <input type="number" id="packageDays" value={formData.packageDays} onChange={handleChange} placeholder="Days" className="border p-2 rounded w-full" />
          <input type="number" id="packageNights" value={formData.packageNights} onChange={handleChange} placeholder="Nights" className="border p-2 rounded w-full" />
        </div>
        <textarea id="packageAccommodation" value={formData.packageAccommodation} onChange={handleChange} placeholder="Accommodation" className="border p-2 rounded w-full resize-none" />
        <select id="packageTransportation" value={formData.packageTransportation} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Select Transportation</option>
          <option value="Flight">Flight</option>
          <option value="Train">Train</option>
          <option value="Boat">Boat</option>
          <option value="Other">Other</option>
        </select>
        <textarea id="packageMeals" value={formData.packageMeals} onChange={handleChange} placeholder="Meals" className="border p-2 rounded w-full resize-none" />
        <textarea id="packageActivities" value={formData.packageActivities} onChange={handleChange} placeholder="Activities" className="border p-2 rounded w-full resize-none" />
        <input type="number" id="packagePrice" value={formData.packagePrice} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="packageOffer" checked={formData.packageOffer} onChange={handleChange} />
          <label>Offer?</label>
        </div>
        {formData.packageOffer && <input type="number" id="packageDiscountPrice" value={formData.packageDiscountPrice} onChange={handleChange} placeholder="Discount Price" className="border p-2 rounded w-full" />}
        <input type="file" multiple onChange={handleFile} className="border p-2 rounded w-full" />
        <button type="submit" disabled={loading} className="bg-[#EB662B] text-white p-3 rounded hover:opacity-90">
          {loading ? "Updating..." : "Update Package"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePackage;