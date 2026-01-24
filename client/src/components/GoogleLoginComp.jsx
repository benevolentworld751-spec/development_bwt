import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const GoogleLoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(loginStart());

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(loginSuccess(data.user));
        toast.success("Logged in with Google");
        navigate("/");
      } else {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google Login Failed")}
      />
    </div>
  );
};

export default GoogleLoginComp;
