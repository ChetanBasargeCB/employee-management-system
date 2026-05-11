import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const validation = (name, email, phone, password, role) => {
  let errors = { name: "", email: "", phone: "", password: "", role: "", status: true };
  if (!name) { errors.name = "Name required"; errors.status = false; }
  if (!email) { errors.email = "Email required"; errors.status = false; }
  if (!role) { errors.role = "Select a role"; errors.status = false; }
  
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  if (!password) { 
    errors.password = "Password required"; 
    errors.status = false; 
  } else if (!passwordRegex.test(password)) {
    errors.password = "Min 6 chars, 1 digit, 1 symbol";
    errors.status = false;
  }

  if(!phone || phone.length !== 10){
     errors.phone = "Valid 10-digit phone required"; errors.status = false; 
  }
  return errors;
}

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", phone: "", password: "", role: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState({ name: "", email: "", phone: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) setError(prev => ({ ...prev, [name]: "" }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate = validation(data.name, data.email, data.phone, data.password, data.role);
    if (!validate.status) {
      setError(validate);
      return;
    }
    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/admin/register", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "Application/json" },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        toast.success("Success! Redirecting...");
        setTimeout(() => { navigate("/login"); }, 2000);
      } else {
        const info = await resp.json();
        toast.error(info.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:ml-64 bg-slate-50 flex items-center justify-center p-6 lg:ml-64 transition-all">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="flex flex-col lg:flex-row w-full mb-12 max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="w-full lg:w-[38%] bg-indigo-600 p-8 lg:p-12 text-white flex flex-col justify-between relative">
          <div className="relative z-10">
             <Link to={"/"} className="text-sm font-semibold opacity-90 hover:opacity-100 transition-all flex items-center gap-1">
               &larr; Home
             </Link>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-3 leading-tight">Create <br/> Account</h1>
            <p className="text-indigo-100 text-sm mb-8 opacity-80 font-medium">Join our community today.</p>
            <Link to={"/login"} className="px-10 py-2.5 border-2 border-white/30 rounded-xl hover:bg-white hover:text-indigo-600 transition-all text-sm font-bold inline-block">
              Login Instead
            </Link>
          </div>
          
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="w-full lg:w-[62%] p-8 lg:p-14 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Personal Details</h2>
            
            <form onSubmit={handelSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                  <input name="name" type="text" placeholder="Chetan Basarge" onChange={handelInput} value={data.name}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${error.name ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-indigo-500'}`} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Role</label>
                  <select name="role" onChange={handelInput} value={data.role}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none bg-white cursor-pointer ${error.role ? 'border-red-500' : 'border-slate-100 focus:border-indigo-500'}`}>
                    <option value="" disabled>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Hr">HR</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
                <input name="email" type="email" placeholder="chetan@company.com" onChange={handelInput} value={data.email}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${error.email ? 'border-red-500' : 'border-slate-100 focus:border-indigo-500'}`} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                <input name="phone" type="tel" placeholder="7499919135" onChange={handelInput} value={data.phone}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${error.phone ? 'border-red-500' : 'border-slate-100 focus:border-indigo-500'}`} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide"> Password</label>
                <div className="relative">
                  <input name="password" type={showpassword ? "text" : "password"} placeholder="••••••••" onChange={handelInput} value={data.password}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${error.password ? 'border-red-500' : 'border-slate-100 focus:border-indigo-500'}`} />
                  <button type="button" onClick={() => setShowpassword(!showpassword)} className="absolute right-4 top-3 text-slate-400 hover:text-indigo-600">
                    {showpassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{error.password}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl text-md font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all mt-4 disabled:bg-indigo-300">
                {loading ? "Creating..." : "Create  Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}