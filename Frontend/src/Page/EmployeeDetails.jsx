import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Phone, Mail, Building2, Briefcase, Calendar, ChevronLeft, ShieldCheck } from "lucide-react";
import { MdAccountCircle } from "react-icons/md";

export default function EmployeeDetails() {
  const [employee, setEmployee] = useState({
    name: "", email: "", phone: "", department: "", role: "", status: "", join_date: "",
  });
  
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)

  const handle_employee_details = async () => {
    if (!id) return;
    try {
      const resp = await fetch(`http://localhost:3000/employes/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json();
      if (resp.ok) {
        setEmployee({
          name: result.name,
          email: result.email,
          phone: result.phone,
          department: result.department,
          role: result.role,
          status: result.status,
          join_date: new Date(result.createdAt).toLocaleDateString(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { handle_employee_details(); }, [id]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-3 sm:p-6 lg:ml-64 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs font-bold bg-blue-500 px-2 py-1 text-white rounded-sm   hover:text-black transition-all"
          >
            <ChevronLeft size={14} /> Back
          </button>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee File</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          
          <div className="h-20 bg-linear-to-r from-slate-800 to-slate-900 relative">
            <div className="absolute -bottom-8 left-6 p-1 bg-white rounded-full">
               <MdAccountCircle className="text-slate-200 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50" />
            </div>
          </div>

          <div className="pt-10 pb-6 px-6 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">{employee.name || "Loading..."}</h2>

                <div className="flex items-center gap-2 mt-1">
                   <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                     employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                   }`}>
                     {employee.status}
                   </span>

                   <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                     <ShieldCheck size={12} /> VERIFIED
                   </span>

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 pt-6">
              <DetailItem icon={<Briefcase size={16}/>} label="Role" value={employee.role} />

              <DetailItem icon={<Building2 size={16}/>} label="Dept" value={employee.department} />

              <DetailItem icon={<Mail size={16}/>} label="Email" value={employee.email} />

              <DetailItem icon={<Phone size={16}/>} label="Phone" value={employee.phone} />

              <DetailItem icon={<Calendar size={16}/>} label="Joined" value={employee.join_date} />
            </div>

            <div className="mt-8 flex gap-3">
               <a href={`mailto:${employee.email}`} className="flex-1 text-center bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
                 Email
               </a>
               <a href={`tel:${employee.phone}`} className="flex-1 text-center bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                 Call
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-400 shrink-0">{icon}</div>
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
        <span className="text-slate-700 font-bold text-sm truncate">{value || "---"}</span>
      </div>
    </div>
  );
}