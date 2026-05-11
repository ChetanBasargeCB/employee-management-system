import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = localStorage.getItem("user") || "Guest";
  const role = localStorage.getItem("role") || "Member";

  return (
    
    <nav className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm lg:ml-64 transition-all duration-300">
      
      
      <div className="hidden lg:flex items-center space-x-3">
        <div className="w-9 h-9 bg-linear-to-br  from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
          <span className="text-white font-bold text-lg">E</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-slate-800 tracking-tight text-md uppercase">Employee</span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Management</span>
        </div>
      </div>

      <div className="lg:hidden"></div>

      <div className="flex items-center">
        <Link to="/profile" className="flex items-center space-x-3 group hover:bg-slate-50 p-1.5 rounded-xl transition-all">
          
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {user}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none">
              {role}
            </span>
          </div>

          <div className="relative">
            <MdAccountCircle className="w-9 h-9 text-slate-300 group-hover:text-blue-500 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </Link>
      </div>
    </nav>
  );
}