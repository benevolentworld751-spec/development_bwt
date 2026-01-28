import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER_URL
    : "http://localhost:5000";

const AdminRoute = () => {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    let mounted = true;

    const authCheck = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/admin-auth`, {
          credentials: "include",
        });

        if (!mounted) return;

        if (res.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setOk(false);
      }
    };

    authCheck();

    return () => {
      mounted = false;
    };
  }, []);

  if (ok === null) return <Spinner />; // still verifying

  return ok ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
