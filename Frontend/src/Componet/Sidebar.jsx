import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, UserCircle, Box, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Contex/AuthContex';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, to: "/" },
    { name: 'Employees', icon: <Users size={20} />, to: "/employees" },
    { name: 'Departments', icon: <Box size={20} />, to: "/departments" },
    { name: 'Profile', icon: <UserCircle size={20} />, to: "/profile" },
  ];

  // check if the current path matches the item link
  const isActive = (path) => location.pathname === path;

  const {user} =useAuth()
  useEffect(()=>{
    user
  })

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-1 left-4 z-50 p-2 bg-[#001529] text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-screen bg-[#001529] text-white flex flex-col justify-between p-4 z-40
        transition-transform duration-300 ease-in-out w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        
        <div>
          {/* Logo Section */}
          <div className="flex items-center space-x-3 px-2 mb-10 mt-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="font-bold text-lg text-white">E</span>
            </div>
            <div className="leading-none uppercase tracking-wider">
              <h2 className="text-sm font-bold">Employee</h2>
              <p className="text-[8px] text-gray-400">Management System</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Link 
                to={item.to}
                key={index}
                onClick={() => setIsOpen(false)} 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive(item.to) 
                    ? 'bg-[#1890ff] text-white shadow-md shadow-blue-900/20' 
                    : 'text-gray-400 hover:bg-[#ffffff10] hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="bg-[#ffffff08] rounded-xl p-3 border border-[#ffffff10]">
          <div className="flex items-center space-x-3">
            <div className="relative shrink-0">
              <img 
                src={`https://api.dicebear.com/8.x/notionists/svg?seed=Chetan`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-600 bg-slate-700"
              />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${user.name===""?"bg-red-500 ":"bg-green-500 "} border-2 border-[#001529] rounded-full`}></div>
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold truncate animate-pulse">{user.name ||"Login please"}</h1>
              <h3 className="text-[10px] text-gray-400 font-medium uppercase">{user.role ||"" }</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}