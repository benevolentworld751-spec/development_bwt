import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/user/userSlice";
import loginImage from "../assets/login.png";
import { GoogleLogin } from "@react-oauth/google";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_SERVER_URL;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Local login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // JWT cookie
      });

      const data = await res.json();

      if (data?.success) {
        dispatch(loginSuccess(data.user));
        toast.success(data.message);

        // Redirect based on role
        if (data.user.user_role === 1) navigate("/profile/admin");
        else navigate("/");
      } else {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Login failed");
      console.error(error);
    }
  };

  // ✅ Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(loginStart());

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: "include", // JWT cookie
      });

      const data = await res.json();

      if (data.success) {
        dispatch(loginSuccess(data.user));
        toast.success("Logged in with Google");

        // Automatic admin redirect
        if (data.user.user_role === 1) navigate("/profile/admin");
        else navigate("/");
      } else {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Google login failed");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#FFF1DA]">
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FFF1DA]">
        <div className="rounded-md w-[90%] md:w-[60%] bg-white mx-auto flex flex-col gap-6">
          <h1 className="text-center text-lg mt-6 font-medium md:text-3xl md:font-bold text-gray-800">
            Welcome to <span className="text-[#6358DC]">Benevolent</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-5 h-auto md:h-[450px] items-center justify-center p-4">
            <div className="w-full md:w-1/2 flex justify-center">
              <img src={loginImage} alt="Login" className="max-h-[300px]" />
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2 px-4">
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full mt-2 p-3 border rounded-md bg-gray-200 outline-none"
                />
              </div>

              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your Password"
                  className="w-full mt-2 p-3 border rounded-md bg-gray-200 outline-none"
                />
              </div>

              <button className="w-full bg-[#EB662B] text-white p-3 mt-4 rounded-md">
                {loading ? "Loading..." : "Login"}
              </button>

              <p className="my-4 text-center">
                Don't have an account?{" "}
                <span className="text-[#EB662B]">
                  <Link to="/signup">Signup</Link>
                </span>
              </p>

              <div className="my-4 text-center text-gray-500">OR</div>

              {/* Google Login */}
              <div className="w-full flex justify-center mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google Login Failed")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
