import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AppLayout from "./Componet/AppLayout"
import Home from "./Page/Home"
import Register from "./Page/Register"
import Login from "./Page/login"
import Profile from "./Page/Profile"
import AddEmployees from "./Page/AddEmployees"
import Employees from "./Page/Employees"
import Departments from "./Page/Deparments"
import EmployeeDetails from "./Page/EmployeeDetails"



function App() {
 const router = createBrowserRouter([{
  path:"/",
  element:<AppLayout/>,
  children:[{
    path:"",
    element:<Home/>
  },
  {
    path:"/departments",
    element:<Departments/>
  },
 
  {
    path:"/add",
    element:<AddEmployees/>
  },
  {
    path:"/add/:id",
    element:<AddEmployees/>
  },
  {
    path:"/employee_detail/:id",
    element:<EmployeeDetails/>
  },
  {
    path:"/employees",
    element:<Employees/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
]

 }])
  return (
    <>
   <RouterProvider router={router}/>
  
    </>
  )
}

export default App
