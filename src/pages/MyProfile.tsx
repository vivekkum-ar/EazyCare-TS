import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {


  const {userData, setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState<any>(false)
  
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      
      formData.append('image',image)

      const {data} = await axios.post(backendUrl+"/api/user/update-profile",formData,{headers:{token}})
      if(data.success){
         toast.success(data.message)
         await loadUserProfileData()
         setEditMode(false)
         setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error:any) {
      console.log(error)
      toast.error(error.message)
    }    
  }

  useEffect(() => {
    loadUserProfileData()
  },[])

  useEffect(() => {
    console.log(image)
    console.log(userData.image)
  },[image])

  return userData && (
    <div className="max-w--lg flex flex-col gap-2 text-sm">
      {
        editMode ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img src={image ? URL.createObjectURL(image) : userData.image} alt="" className="w-36 rounded" />
            {editMode && <img src={assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12" />}
          </div>
          <input onChange={(e:any) => setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label> : <img src={userData.image} className="w-36 rounded" alt="" />
      }
      
      {
        editMode ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" value={userData.name} onChange={(e:any) => setUserData((prev:any) => ({...prev,name:e.target.value}))} /> : <p className="font-medium text-3xl text-neutral-800 mt-4" >{userData.name}</p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none"/>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {
            editMode ? <input className="bg-gray-100 max-w-52" type="number" value={userData.phone} onChange={(e:any) => setUserData((prev:any) => ({...prev,phone:e.target.value}))} /> : <p className="text-blue-500">{userData.phone}</p>
          }
          <p className="font-medium">Address:</p>
          {
            editMode ? 
            <p className="">
              <input className="bg-gray-50" type="text" value={userData.address.line1} onChange={(e:any) => setUserData((prev:any) => ({...prev,address:{...prev.address,line1:e.target.value}}))}/>
              <br />
              <input className="bg-gray-50" type="text" value={userData.address.line2} onChange={(e:any) => setUserData((prev:any) => ({...prev,address:{...prev.address,line2:e.target.value}}))}/>
            </p>:
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
        <div className="">
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {
            editMode ? <select className="max-w-20 rounded bg-gray-100" name="" id="" value={userData.gender} onChange={(e:any) => setUserData((prev:any) => ({...prev,gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Rather not say">Rather not say</option>
            </select> : <p className="text-gray-400">{userData.gender}</p>
          }
          <p className="font-medium">
            Birthday:
          </p>
          {
            editMode ? <input className="bg-gray-100 max-w-28" type="date" value={userData.dob} onChange={(e:any) => setUserData((prev:any) => ({...prev,dob:e.target.value}))} /> : <p className="text-gray-400">{userData.dob}</p>
          }
          </div>
          </div>
          <div className="mt-10">
          {
            editMode ? 
            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200" onClick={updateUserProfileData}>Save Information</button>
            :<button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200" onClick={() => {setEditMode(true)}}>Edit</button>
          }

      </div>
    </div>
  )
}

export default MyProfile