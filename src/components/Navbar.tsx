import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import {Icon} from "@iconify/react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token,setToken, userData } = useContext(AppContext)

  const logout = async () => {
      setToken(false)
      localStorage.removeItem("token")
      toast.success("Logged out successfully")
      
  }
  return (
    <div className="lg:px-4 mt-2 flex justify-between items-center py-4 text-sm mb-5 border-b border-b-gray-400">

      {/* <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
        srcSet=""
      /> */}
      <div onClick={() => navigate("/")} className="flex flex-row relative items-center gap-2 cursor-pointer">
      <Icon icon={"raphael:paper"} className="w-10 h-10 text-primary"/>
      <p className="italic text-xl absolute line-clamp-1 w-44 text-zinc-500 font-bold text-center scale-110"><span className="text-primary">Eazy</span>Care</p>
      </div>

      {/* /* ------------------------------------------- Lg Menu ------------------------------------------  */}
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
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="hidden md:block w-8 rounded-full" src={userData.image} alt={userData.name}/>
            <img className="p-2.5" src={assets.dropdown_icon} alt=""/>
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-xl flex flex-col gap-4 p-4">
                <p onClick={() => navigate("my-profile")} className="hover hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("my-appointments")} className="hover hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover hover:text-black cursor-pointer">Logout</p>
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
        <img className="w-6 md:hidden" onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" />
        {/* /* ---------------------------------------- Lg Menu Ends ----------------------------------------  */}

        {/* /* ----------------------------------------- Mobile Menu ----------------------------------------  */}
        <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
          <div className="flex items-center justify-between px-5 py-6">
          <div onClick={() => navigate("/")} className="flex flex-row relative items-center gap-2 cursor-pointer">
      <Icon icon={"raphael:paper"} className="w-10 h-10 text-primary"/>
      <p className="italic text-xl absolute line-clamp-1 w-44 text-zinc-500 font-bold text-center scale-110"><span className="text-primary">Eazy</span>Care</p>
      </div>
            <img src={assets.cross_icon} onClick={() => setShowMenu(false)} alt="" className="w-7" />
          </div>
          <ul className="flex flex-col items-center gap-2 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}><p  className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}><p  className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}><p  className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}><p  className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
