import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import {Icon} from "@iconify/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="glass px-4 mt-2 flex justify-between items-center py-4 text-sm mb-5 border-b border-b-gray-400">
      {/* <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
        srcSet=""
      /> */}
      <div className="flex flex-row relative items-center gap-2 cursor-pointer">
      <Icon icon={"raphael:paper"} className="w-10 h-10 text-primary"/>
      <p className="italic text-xl absolute line-clamp-1 w-44 text-zinc-500 font-bold text-center scale-110"><span className="text-primary">Eazy</span>Care</p>
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/home"}>
          <li className="py-1 uppercase">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1 uppercase">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1 uppercase">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1 uppercase">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt=""/>
            <img className="p-2.5" src={assets.dropdown_icon} alt=""/>
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-xl flex flex-col gap-4 p-4">
                <p onClick={() => navigate("my-profile")} className="hover hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("my-appointments")} className="hover hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={() => setToken(false)} className="hover hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white font-light hidden px-8 py-3 rounded-full md:block "
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
