import React from 'react';
import { Code2, Bug, CloudCog, Cpu, Users2, Database } from 'lucide-react';

export default function Departments() {
  const departments = [
    { name: 'Development', icon: <Code2 className="text-blue-600" />, color: 'bg-blue-50' },
    { name: 'Testing', icon: <Bug className="text-red-600" />, color: 'bg-red-50' },
    { name: 'DevOps', icon: <CloudCog className="text-indigo-600" />, color: 'bg-indigo-50' },
    { name: 'Hardware', icon: <Cpu className="text-amber-600" />, color: 'bg-amber-50' },
    { name: 'HR', icon: <Users2 className="text-teal-600" />, color: 'bg-teal-50' },
    { name: 'Data Science', icon: <Database className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  return (
   
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-8 lg:ml-64 transition-all duration-300">
      
     
      <div className="mb-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Departments</h1>
        <p className="text-sm text-slate-500">Select a department to manage</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {departments.map((dept, index) => (
          <div 
            key={index}
            className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer active:scale-95 flex items-center space-x-4 w-full"
          >
            <div className={`shrink-0 w-14 h-14 ${dept.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
              {React.cloneElement(dept.icon, { size: 28 })}
            </div>

            {/* Department Name */}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                {dept.name}
              </h2>
              <p className="text-xs text-slate-400 font-medium tracking-tight">
                Corporate Division
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}