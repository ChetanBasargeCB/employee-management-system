import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
   name: String,
   email: String,
   phone: String,
   department: String,
   role: String,
   status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
   }
}, { timestamps: true })

export default mongoose.model("Employe",EmployeeSchema)