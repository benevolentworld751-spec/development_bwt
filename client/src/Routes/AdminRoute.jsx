import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER_URL
    : "http://localhost:5000";


const AdminRoute = () => {
  const [ok, setOk] = useState(null);

  const authCheck = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/admin-auth`, {
        method: "GET",
        credentials: "include", // ✅ REQUIRED
      });

      setOk(res.ok);
    } catch (error) {
      console.error(error);
      setOk(false);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  if (ok === null) return <Spinner />;

  return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
