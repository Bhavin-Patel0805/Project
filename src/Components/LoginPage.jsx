import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Eye, EyeOff, Lock, User } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //To submit the data

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    if (!rememberMe) {
      toast.error("You must agree to remember me.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    // === NEW: log all form data to the console ===
    // NOTE: Logging passwords is fine for development/testing only. Remove before production.
    console.log("Login form submitted — form data:", {
      email,
      password,
      rememberMe,
      showPassword,
      timestamp: new Date().toISOString(),
    });

    // Simulate a successful login: store auth info in localStorage so Navbar can detect it
    try {
      // create a simple fake token for demo (replace with real token from server in production)
      const fakeToken = btoa(`${email}:${Date.now()}`);

      // Persist token & login flag (Navbar checks these keys)
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("isLoggedIn", "true");

      try {
        window.dispatchEvent(
          new CustomEvent("authChanged", { detail: { loggedIn: true } }),
        );
      } catch (err) {
        // ignore if browser doesn't allow CustomEvent construction in this environment
      }
    } catch (err) {
      // ignore storage errors
    }

    // Show success toast
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 1200,
      theme: "light",
    });

    // Redirect to home after short delay so user sees the toast
    setTimeout(() => {
      navigate("/");
    }, 1250);
  };

  return (
    <div
      className={"relative min-h-screen font-sans"}
      style={{ fontFamily: "'Playfair Display',serif" }}
    >
      <ToastContainer />
      <div className={"relative z-10 flex justify-center items-center min-h-screen p-4"}>
        <button
          onClick={() => navigate("/")}
          className={"absolute top-6 cursor-pointer left-6 z-20 bg-gradient-to-r from-gray-300 to-gray-400 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center justify-center transition-transform transform hover:-translate-y-0.5"}
        >
          <ArrowLeft className={`h-5 text-gray-800`} />
          <span className={"ml-1"}>Back To Home</span>
        </button>

        {/* main card */}
        <div className={"w-full max-w-md p-8 rounded-2xl bg-white shadow-xl transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden"}>
          <div className={"absolute -top-10 -left-10 w-20 h-20 bg-black rounded-full opacity-50"}></div>
          <div className={"absolute -bottom-10 -right-10 w-24 h-24 bg-gray-400 rounded-full opacity-50"}></div>

          <h2 className={"text-3xl font-semibold text-center text-gray-800 mb-2"}>Welcome Back</h2>
          <p className={"text-center text-gray-500 mb-8"}>
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className={"mb-5"}>
              <label htmlFor="email" className={"block text-gray-600 text-sm font-medium mb-2"}>
                Email
              </label>
              <div className={"relative"}>
                <div className={"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"}>
                  <User className={"h-5 w-5 text-gray-400"} />
                </div>
                <input
                  type="email"
                  id="email"
                  className={"w-full pl-10 p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"}
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={"mb-5"}>
              <label htmlFor="password" className={"block text-gray-600 text-sm font-medium mb-2"}>
                Password
              </label>
              <div className={"relative"}>
                <div className={"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"}>
                  <Lock className={"h-5 w-5 text-gray-400"} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={"w-full pl-10 pr-10 p-3 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className={"absolute inset-y-0 right-0 pr-3 flex items-center"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={"h-5 w-5 text-gray-400"} />
                  ) : (
                    <Eye className={"h-5 w-5 text-gray-400"} />
                  )}
                </button>
              </div>
            </div>

            <div className={"flex items-center mb-6"}>
              <div className={"flex items-center h-5"}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  className={"h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"}
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  required
                />
              </div>
              <div className={"ml-3 text-sm"}>
                <label
                  htmlFor="rememberMe"
                  className={"font-medium cursor-pointer text-gray-700"}
                >
                  Remember Me{" "}
                  <span className={"text-red-500"}>*</span>
                </label>
              </div>
            </div>

            <button type="submit" className={"w-full py-3 px-4 cursor-pointer font-[pacifico] text-black bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-md text-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"}>
              Login
            </button>
          </form>

          <div className={"mt-4 text-center"}>
            <span className={"text-sm text-gray-500"}>
              Don't have an account?{" "}
            </span>
            <a href="/signup" className={"text-sm text-black font-medium"}>
              Sing up
            </a>
          </div>
        </div>
      </div>
      {/* Add font import */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`}
      </style>
    </div>
  );
};

export default LoginPage;
