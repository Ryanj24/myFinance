import React from 'react'
import SideNavbar from '../SideNavbar/SideNavbar.jsx'
import TopNavbar from '../TopNavbar/TopNavbar.jsx'
import { Outlet } from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'

const MainLayout = () => {

  const desktopScreen = useMediaQuery({query: "(min-width: 1224px)"})
  return (
    <main style={desktopScreen ? {display: "flex"} : {display: "flex", flexDirection: "column"}}>
        {desktopScreen 
        ?
          <SideNavbar />
        :
          <TopNavbar />
        }
        
        <Outlet />
    </main>
  )
}

export default MainLayout