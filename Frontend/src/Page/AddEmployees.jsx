import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {ChevronLeft,UserPlus,Mail,Phone,Building2,Briefcase,Activity,} from "lucide-react";
import { useEffect } from "react";

const validateForm = (data) => {
  let errors = {
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "",
  };
  let isOk = true;
  if (!data.name) {
    errors.name = "Full name is required";
    isOk = false;
  }
  if (!data.email) {
    errors.email = "Email is required";
    isOk = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format";
    isOk = false;
  }
  if (!data.phone) {
    errors.phone = "Phone is required";
    isOk = false;
  } else if (data.phone.length !== 10) {
    errors.phone = "Must be exactly 10 digits";
    isOk = false;
  }
  if (!data.department) {
    errors.department = "Department is required";
    isOk = false;
  }
  if (!data.role) {
    errors.role = "Please select a role";
    isOk = false;
  }
  if (!data.status) {
    errors.status = "Status is required";
    isOk = false;
  }
  return { errors, isOk };
};

export default function AddEmployees() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // getting id for update
  const { id } = useParams();
  // console.log(id)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm(data);
    if (!validation.isOk) {
      setErrors(validation.errors);
      toast.error("Please fill the all filed properly");
      return;
    }

    try {
      setLoading(true);

      let url = "http://localhost:3000/employes/add";
      let method = "POST";

      // edit mode

      if (id) {
        url = `http://localhost:3000/employes/update/${id}`;
        method = "PUT";
      }

      const resp = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (resp.status === 409) return toast.error("Employee Already exists");
      if (resp.status === 401) return toast.error("Please Login first");

      if (resp.ok) {
        toast.success(
          id ? "Employee updated successfully" : "Employee added successfully",
        );

        setData({
          name: "",
          email: "",
          phone: "",
          department: "",
          role: "",
          status: "Active",
        });

        setTimeout(() => {
          navigate("/employees");
        }, 2000);
      } else {
        toast.error("Failed to add employee");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // update employee

  // get single employee
  const getemployee = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/employes/single/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await resp.json();
      console.log(result);

      if (resp.ok) {
        setData(result);
      }
    } catch (error) {
      console.log(error, "single empoyee getting error");
    }
  };

  useEffect(() => {
    if (id) {
      getemployee();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-10 md:ml-64 lg:ml-64 transition-all duration-300">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Add Employee
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Dashboard / Employees / Add
            </p>
          </div>
          <Link
            to="/employees"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm"
          >
            <ChevronLeft size={16} /> Back to list
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-md sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
              <UserPlus size={20} className="text-blue-600" />
              Employee Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
              <InputGroup
                label="Full Name"
                name="name"
                icon={<UserPlus size={18} />}
                value={data.name}
                onChange={handleInput}
                error={errors.name}
                placeholder="Chetan Basarge"
              />

              <InputGroup
                label="Email Address"
                name="email"
                type="email"
                icon={<Mail size={18} />}
                value={data.email}
                onChange={handleInput}
                error={errors.email}
                placeholder="chetan@example.com"
              />

              <InputGroup
                label="Phone Number"
                name="phone"
                type="tel"
                icon={<Phone size={18} />}
                value={data.phone}
                onChange={handleInput}
                error={errors.phone}
                placeholder="7499919135"
              />
              <InputGroup
                label="Department"
                name="department"
                icon={<Building2 size={18} />}
                value={data.department}
                onChange={handleInput}
                error={errors.department}
                placeholder="Engineering"
              />

              <InputGroup
                label="Role"
                name="role"
                icon={<Briefcase size={18} />}
                value={data.role}
                onChange={handleInput}
                error={errors.role}
                placeholder="MERN Stack Developer"
              />

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Activity size={18} className="text-slate-400" /> Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={data.status}
                    onChange={handleInput}
                    className={`w-full appearance-none px-4 py-2.5 rounded-lg border transition-all outline-none focus:ring-4 focus:ring-blue-50 ${
                      errors.status
                        ? "border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    } bg-white`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.status && (
                  <p className="text-xs text-red-500 mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-10 py-3 rounded-lg text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                {" "}
                {loading
                  ? id
                    ? "Updating..."
                    : "Update"
                  : id
                    ? "Update"
                    : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  label,
  name,
  type = "text",
  icon,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <span className="text-slate-400">{icon}</span> {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border transition-all outline-none focus:ring-4 focus:ring-blue-50 ${
          error
            ? "border-red-500"
            : "border-slate-200 focus:border-blue-500 text-slate-700"
        } placeholder:text-slate-400`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
