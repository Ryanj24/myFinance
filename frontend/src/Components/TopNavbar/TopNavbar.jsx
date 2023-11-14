import React from 'react'
import { useRef } from 'react'
import NavHeader from '../SideNavbar/NavHeader.jsx'
import NavLinks from '../SideNavbar/NavLinks.jsx'
import './TopNavbar.css'
import { ArrowCircleDown } from '@mui/icons-material'

const TopNavbar = () => {

  const navRef = useRef();
  const minBtnRef = useRef();

  const handleMinimiseClick = () => {
    if (navRef.current.className === "top-navbar") {
      navRef.current.className = "top-navbar expanded"
      minBtnRef.current.style.rotate = "180deg"
    } else {
      minBtnRef.current.style.rotate = null
      navRef.current.className = "top-navbar"
    }
  }

  return (
    <nav className='top-navbar' ref={navRef}>
      <NavHeader />
      <NavLinks />
      <div className="nav-minimise">
        <button className='minimise-btn' onClick={handleMinimiseClick} ref={minBtnRef}>
          <ArrowCircleDown />
        </button>        
      </div>
    </nav>
  )
}

export default TopNavbar