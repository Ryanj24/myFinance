import React from 'react'
import SideNavbar from '../SideNavbar/SideNavbar.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <main style={{display: "flex"}}>
        <SideNavbar />
        <Outlet />
    </main>
  )
}

export default MainLayout