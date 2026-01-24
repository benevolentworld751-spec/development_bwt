// src/Page/RoleSelectionPage.jsx
import { useNavigate } from "react-router-dom";
import { User, ShieldCheck } from "lucide-react";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Choose Your Role
      </h1>

      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl w-full">
        {/* User Option */}
        <div
          onClick={() => navigate("/login")}
          className="cursor-pointer bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center hover:scale-105 hover:bg-orange-50 transition-transform duration-300"
        >
          <User className="w-16 h-16 text-orange-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">User</h2>
          <p className="text-gray-500 text-center">
            Book holidays, apply for visas, and explore our travel packages.
          </p>
          <button className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition">
            Continue as User
          </button>
        </div>

        {/* Admin Option */}
        <div
          onClick={() => navigate("/admin/login")}
          className="cursor-pointer bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center hover:scale-105 hover:bg-blue-50 transition-transform duration-300"
        >
          <ShieldCheck className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Admin</h2>
          <p className="text-gray-500 text-center">
            Manage bookings, users, and travel packages securely.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
            Continue as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
