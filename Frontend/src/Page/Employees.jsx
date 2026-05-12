import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { FaHandRock } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()




  // fetching data
  const handleGetdata = async () => {
    try {
      const resp = await fetch("http://localhost:3000/employes/all", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      // console.log(resp);

      if(resp.status===401){
        toast.error("To view data please login")
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      }
      const result = await resp.json();

      if (resp.ok) {
        setLoading(false);
      // console.log(loading)

        setEmployees(result);
      }

      // console.log(result);
    } catch (error) {
      setLoading(false);
    }
  };

 

  // delete
  const handleDelete = async(id)=>{
    // console.log(id,"delete id")
    try {
      const resp = await fetch(`http://localhost:3000/employes/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json()

      if(!resp.ok) {
        return toast.error(result.message || "Failed to deleting employee")
      } else{
        toast.success(result.message || "Employee deleted")
        handleGetdata()
      }
      

    } catch (error) {
      console.log(" employee deleting error",error)
      toast.error("FE errror",error)
    }
  }
  
   useEffect(()=>{
    handleGetdata()
  },[])


  return (
    <div className="p-4 md:ml-80 md:mr-10 font-sans text-slate-700">
      <ToastContainer position="top-center" autoClose={3000} />

      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <p className="text-gray-500 text-sm">Dashboard / Employees</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search employees by name..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to={"/add"}
            className="bg-blue-600 text-white max-md:text-center px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Employee
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                <th className="py-3 px-4 font-semibold">NAME</th>
                <th className="py-3 px-4 font-semibold">EMAIL</th>
                <th className="py-3 px-4 font-semibold">DEPARTMENT</th>
                <th className="py-3 px-4 font-semibold">ROLE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 ">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 animate-pulse text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : employees.length ===0  ?                 <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10  text-gray-500"
                  >
                    No data found
                  </td>
                </tr> :employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-gray-50 transition-colors text-sm"
                >
                  <td title="View Employee Details" onClick={()=>navigate(`/employee_detail/${emp._id}`)} className="py-4 px-4 cursor-pointer hover:text-blue-600 transition-colors font-bold text-gray-900">
                    {emp.name}
                  </td>
                  <td className="py-4 px-4 text-gray-500">{emp.email}</td>
                  <td className="py-4 px-4">{emp.department}</td>
                  <td className="py-4 px-4">{emp.role}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4  gap-4 items-center justify-center flex ml-5  text-right">
                    <TiEdit onClick={()=>navigate(`/add/${emp._id}`)}  className="text-blue-600 text-xl hover:scale-110 hover:cursor-pointer ">
                      
                    </TiEdit>
                    <MdDeleteForever onClick={()=>handleDelete(emp._id)} className=" text-red-600 text-xl hover:scale-110 hover:cursor-pointer">
                      
                    </MdDeleteForever>
                  </td>
                </tr>
              ))}
            

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
