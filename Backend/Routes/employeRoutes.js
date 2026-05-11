import express from 'express'
import isAdmin from '../Middelware/authAdminMiddleware.js'
import { addEmployees, deleteEmployee, editEmployee, getAllData, getSinglemployee,  } from '../Controller/employesController.js'

const EmployeRouter = express.Router()

EmployeRouter.post("/add",isAdmin,addEmployees)  
EmployeRouter.delete("/delete/:id",deleteEmployee)
EmployeRouter.put ("/update/:id",editEmployee)
EmployeRouter.get("/all",isAdmin,getAllData)
EmployeRouter.get("/single/:id",getSinglemployee)


export default EmployeRouter