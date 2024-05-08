import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/doctorContext.jsx";

const Navbar = () => {
  const { aToken,setAToken } = useContext(AdminContext);
  const { dToken,setDToken } = useContext(DoctorContext)
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    // console.log("Logged out")
    aToken && setAToken(""); 
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken(""); 
    dToken && localStorage.removeItem("dToken");
    toast.success("Logged out successfully")
  }
  return (
    <div className="flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b">
      <div className="flex justify-start h-auto items-center">
        <div className="flex items-center text-xs gap-2">
          <div
            onClick={() => navigate("/")}
            className="flex flex-row items-center gap-2 cursor-pointer"
          >
            <Icon icon={"raphael:paper"} className="w-10 h-10 text-primary" />
            <p className="italic text-xl line-clamp-1 w-auto text-zinc-500 font-bold text-center scale-110">
              <span className="text-primary">Eazy</span>Care
            </p>
          </div>
        </div>
        <p className="border ms-4 px-2.5 py-0.5 h-fit rounded-full text-xs gap-2 border-gray-500 text-gray-600 ">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button onClick={() => logout()} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  );
};

export default Navbar;
