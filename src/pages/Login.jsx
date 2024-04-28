import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets.js"
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [state,setState] = useState("Admin")
  const {backendUrl, setAToken} = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSumbitHandler = async (event) => {
    event.preventDefault();

    try {
      if(state === "Admin"){
        const response = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password
        })
        // console.log(response.data.success)
        if(response.data.success){
          // console.log(response.data.token)
          localStorage.setItem("aToken", response.data.token)
          setAToken(response.data.token)
        }
        else{
          toast.error(response.data.message);
          // console.log(response)
        }
      }
    } catch (error) {
      
    }
  }
  return (
    <form onSubmit={onSumbitHandler} action="" className="min-h-[80vh] flex items-center">
      <div className=" flex flex-col gap-3 min-w-[340px] m-auto items-start p-8 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className='text-primary me-1'>{state}</span>
          Login
        </p>
        <div className="w-full">
          <p className="">Email</p>
          <input onChange={(e) => {setEmail(e.target.value)}} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" name="" required/>
        </div>
        <div className="w-full">
          <p className="">Password</p>
          <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" name="" required/>
        </div>
        <button className='bg-primary w-full text-white py-2 rounded-md text-base'>Login</button>
        {
          state === "Admin" ? 
          <p className='text-sm text-[#5E5E5E]'>Doctor Login? <span onClick={() => setState("Doctor")} className='text-primary cursor-pointer underline'>Click here</span></p>
          :
          <p className='text-sm text-[#5E5E5E]'>Admin Login? <span onClick={() => setState("Admin")} className='text-primary cursor-pointer underline'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login