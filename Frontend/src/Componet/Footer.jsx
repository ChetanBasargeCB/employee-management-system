import React from 'react';
import { Copyright, Code2, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<footer className="md:ml-64 w-auto bg-white border-t border-gray-100 py-6 px-6 mt-auto transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
          <Copyright size={14} />
          <span>{currentYear} <span className="text-blue-600 font-bold">EMS</span>. All Rights Reserved.</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 group">
          <span className="text-slate-400 text-sm">Developed with</span>
          <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
          <span className="text-slate-400 text-sm">by</span>
          <div className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100 group-hover:border-blue-200 transition-colors">
            <Code2 size={14} className="text-blue-600 mr-2" />
            <span className="text-slate-700 font-bold text-sm tracking-tight">
              Chetan Basarge
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}