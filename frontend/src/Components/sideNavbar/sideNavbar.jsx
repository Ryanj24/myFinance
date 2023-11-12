import React from 'react'
import { useRef } from 'react'
import './sideNavbar.css'
import { ArrowCircleLeft } from '@mui/icons-material'
import NavHeader from './NavHeader.jsx'
import NavLinks from './NavLinks.jsx'

const SideNavbar = () => {

  const navRef = useRef();
  const minBtnRef = useRef();

  const handleMinimiseClick = () => {
    if (navRef.current.className === "side-navbar") {
      navRef.current.className = "side-navbar min"
      minBtnRef.current.style.rotate = "-180deg"
    } else {
      minBtnRef.current.style.rotate = null
      navRef.current.className = "side-navbar"
    }
  }

  return (
    <nav className='side-navbar' ref={navRef}>
      <div className="nav-minimise">
        <button className='minimise-btn' onClick={handleMinimiseClick} ref={minBtnRef}>
          <ArrowCircleLeft />
        </button>        
      </div>
      <NavHeader />
      <NavLinks />
    </nav>
  )
}

export default SideNavbar