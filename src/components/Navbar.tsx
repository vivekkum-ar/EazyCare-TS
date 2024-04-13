import { assets } from "../assets/assets"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center py-4 text-sm mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" srcSet="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={'/home'}>
          <li className="py-1 uppercase">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={'/doctors'}>
          <li className="py-1 uppercase">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={'/about'}>
          <li className="py-1 uppercase">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to={'/contact'}>
          <li className="py-1 uppercase">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
      <button className="bg-primary text-white font-light hidden px-8 py-3 rounded-full md:block ">
        Create Account
      </button>
      </div>
    </div>
  )
}

export default Navbar