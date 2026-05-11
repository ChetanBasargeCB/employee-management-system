import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from '../Componet/Navbar'

export default function AppLayout() {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
