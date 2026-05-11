import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../Contex/AuthContex";

function Validation(email, password, role) {
  let errors = { email: "", password: "", role: "", status: true };
  if (!email) { errors.email = "Email is required"; errors.status = false; }
  if (!password) { errors.password = "Password is required"; errors.status = false; }
  if (!role) { errors.role = "Role is required"; errors.status = false; }
  return errors;
}

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", role: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //context for getting user data
  const { login } = useAuth()

  const handelInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate = Validation(data.email, data.password, data.role);

    if (!validate.status) {
      setError({ email: validate.email, password: validate.password, role: validate.role });
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await resp.json();

      if (!resp.ok) {
        setLoading(false);
        toast.error(result.message || "Invalid Credentials");
        return;
      }

      // sending data to context
      login(result)

      setLoading(false);
      toast.success("Login Successful");
      return setTimeout(() => { navigate("/") }, 2000);

    } catch (err) {
      setLoading(false);
      toast.error("Login Error");
    }
  };

  return (
  
    <div className="min-h-screen md:ml-64 bg-gray-100 flex items-center justify-center p-4 lg:ml-64 transition-all duration-300">
      <ToastContainer />
      
      <div className="flex flex-col lg:flex-row w-full mb-4 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-125">
        
        <div className="w-full lg:w-[40%] bg-indigo-600 p-8 lg:p-10 text-white flex flex-col justify-center lg:justify-between relative overflow-hidden">
          <div className="relative z-10 mb-6 lg:mb-0">
            <Link to="/" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2">
               Home Page
            </Link>
          </div>

          <div className="relative z-10 mb-4 sm:mb-8 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
              Welcome Back
            </h1>
            <p className="text-indigo-100 mb-6 text-sm sm:text-base">Don't have an account yet?</p>

            <Link to={"/register"} className="px-8 py-2.5 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition-all font-medium inline-block text-sm">
              Sign up
            </Link>
          </div>

          <div className="absolute -bottom-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500 rounded-full opacity-50 pointer-events-none"></div>
        </div>

        <div className="w-full lg:w-[60%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center mb-8">
              Login
            </h2>

            <form onSubmit={handelSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  onChange={handelInput}
                  value={data.email}
                  className={`w-full mt-1 px-4 py-3 rounded-xl border outline-none transition-all text-sm ${
                    error.email ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  }`}
                />
                {error.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.email}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Select Role
                </label>
                <select
                  name="role"
                  value={data.role}
                  onChange={handelInput}
                  className={`w-full mt-1 px-4 py-3 rounded-xl border outline-none transition-all cursor-pointer text-sm ${
                    error.role ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                  } bg-white`}
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Hr">Hr</option>
                </select>
                {error.role && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.role}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showpassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handelInput}
                    value={data.password}
                    className={`w-full mt-1 px-4 py-3 rounded-xl border outline-none transition-all text-sm ${
                      error.password ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowpassword(!showpassword)}
                    className="absolute right-3 top-4 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showpassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.password}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl text-base sm:text-lg font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all mt-4 disabled:bg-indigo-400"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}