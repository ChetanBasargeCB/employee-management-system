import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
 
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:ml-64 transition-all duration-300">
      
  
      <div className=" md:ml-40 lg:mr-20 max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-10 text-center">
        
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <svg 
            className="w-7 h-7 sm:w-10 sm:h-10 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-800 tracking-tight mb-4 leading-tight warp-break-words">
          Welcome to Employees Management Platform
        </h1>
        
        <h2 className="text-sm sm:text-lg text-slate-500 font-medium mb-8 sm:mb-10">
          To Manage Employees, go to Employees
        </h2>

        <div className="flex justify-center px-2">
          <Link 
            to={"/employees"} 
            className="w-full sm:w-auto inline-block bg-[#0061ff] hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 active:scale-95 text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
        
      </div>
    </div>
  )
}