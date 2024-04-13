import React from 'react'
import { assets } from "../assets/assets"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="Logo" srcSet="" />
      <ul>
        <NavLink to={'/home'}>
          <li className="uppercase">Home</li>
          <br />
        </NavLink>
        <NavLink to={'/'}>
          <li className="uppercase">All Doctors</li>
          <br />
        </NavLink>
        <NavLink to={''}>
          <li className="uppercase">About</li>
          <br />
        </NavLink>
        <NavLink to={''}>
          <li className="uppercase">Contact</li>
          <br />
        </NavLink>
        <NavLink to={''}>
          <li className="uppercase">Create Account</li>
          <br />
        </NavLink>
      </ul>
    </div>
  )
}

export default Navbar