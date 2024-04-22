import { useState } from "react"
import { assets } from "../assets/assets"

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "asdasdasdsad@gmail.com",
    phone: "1234567890",
    address:{
      line1: "123, 1st Cross, 2nd Main",
      line2: "Koramangala, Bangalore"
    },
    gender:"Male",
    dob: "01-01-2000",
  });
  const [editMode, setEditMode] = useState(false);
  
  return (
    <div>
      <img src={userData.image} alt="" />
      {
        editMode ? <input type="text" onChange={(e:any) => setUserData((prev) => ({...prev,name:e.target.value}))} /> : <p>{userData.name}</p>
        
      }
    </div>
  )
}

export default MyProfile