import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle, MdLogout, MdArrowBack, MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    name: localStorage.getItem("user") || "",
    role: localStorage.getItem("role") || "",
    email: localStorage.getItem("email") || ""
  });

  const isLoggedIn = !!user.name;

  const handelLogout = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/admin/logout", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (resp.status === 200) {
        localStorage.clear();
        setUser({ name: "", role: "", email: "" });
        toast.success("Logout Successful");
      }
    } catch (error) {
      toast.error("Logout error occurred");
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
   
    <div className="min-h-screen md:ml-64 bg-[#f8f9fa] font-sans text-gray-700 p-4 md:p-10 lg:ml-64  transition-all duration-300">
      
      <div className=" max-w-5xl  mx-auto mb-6 flex flex-row justify-between items-center gap-4">
        <nav className="text-xs sm:text-sm font-medium">
          <span className="text-gray-400">Dashboard</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-gray-600 font-semibold">Profile</span>
        </nav>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-1 text-xs sm:text-sm"
        >
          <MdArrowBack /> Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row overflow-hidden">
        
        <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/30">
          <div className="relative mb-4 md:mb-6">
            <MdAccountCircle className={`text-[100px] sm:text-[120px] md:text-[150px] ${isLoggedIn ? "text-blue-500" : "text-gray-300"}`} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center px-2">
            {user.name || "Guest User"}
          </h2>
          <p className="text-blue-600 font-medium text-xs sm:text-sm mt-1">
            {user.role || "Member"}
          </p>
        </div>

        <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b border-gray-50 pb-2">
              Profile Information
            </h3>

            {!isLoggedIn ? (
              <p className="italic text-gray-400 py-10 text-center md:text-left">
                Please sign in to view your account details.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-10">
                <InfoItem label="Full Name" value={user.name} />
                <InfoItem label="Email Address" value={user.email} />
                <InfoItem label="Current Role" value={user.role} />
                <InfoItem label="Department" value="Development" />
              </div>
            )}
          </div>

          <div className="mt-10 md:mt-12 flex justify-center md:justify-start">
            <button
              onClick={handelLogout}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 text-white ${
                isLoggedIn 
                ? "bg-red-500 hover:bg-red-600 shadow-red-100" 
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              }`}
            >
              {isLoggedIn ? <><MdLogout size={18} /> Logout Account</> : <><MdLogin size={18} /> Sign In</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-gray-800 font-semibold text-base sm:text-lg break-all">
        {value || "---"}
      </span>
    </div>
  );
}