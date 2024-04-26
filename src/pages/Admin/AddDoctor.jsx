import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('General physician')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    try {
      if(!docImg){
        return toast.error("Image not selected");
      }
      const formData = new FormData()
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({
        line1 : address1,
        line2 : address2
      }));

      // console.log formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      })

      console.log("axios started")
      const {data} = await axios.post(backendUrl + "/api/admin/add-doctor" , formData, {
        headers: {
          aToken
        }
      })
      console.log("axios ended")

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
      } else{
        toast.error(data.message)
        // console.log(J"SON.parse(data.collection).collection")
      }

      // {
      //   success: false, 
      //   message: 'E11000 duplicate key error collection: eazydoctor.…il_1 dup key: { email: "richard@eazydoctor.com" }'
      // }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSumbitHandler} className="w-full m-5">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center mb-8 gap-4 text-gray-500 ">
          <label htmlFor="doc-img" className="">
          <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className="w-16 bg-gray-100 rounded-full cursor-pointer" />
          </label>
          <input type="file" onChange={(e) => setDocImg(e.target.files[0])} name="" id="doc-img" hidden/>
          <p className="">Upload doctor <br/> picture</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-start text-gray-600">
          <div className=""> 
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Doctor name</p>
              <input className="border rounded px-3 py-2" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" required/>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Doctor Email</p>
              <input className="border rounded px-3 py-2" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required/>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Doctor Password</p>
              <input className="border rounded px-3 py-2" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required/>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Experience</p>
              <select name="" id="" onChange={(e) => setExperience(e.target.value)} value={experience}>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Fees</p>
              <input className="border rounded px-3 py-2" type="number" onChange={(e) => setFees(e.target.value)} value={fees} placeholder="fees" required/>
            </div>
          </div>
          <div className="">
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Speciality</p>
              <select name="" id="" onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Education</p>
              <input className="border rounded px-3 py-2" type="text" onChange={(e) => setDegree(e.target.value)} value={degree} placeholder="Education" required/>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="">Address</p>
              <input className="border rounded px-3 py-2" type="text" onChange={(e) => setAddress1(e.target.value)} value={address1} placeholder="Address 1" required/>
              <input className="border rounded px-3 py-2" type="text" onChange={(e) => setAddress2(e.target.value)} value={address2} placeholder="Address 2" required/>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
              <p className="mt-4 mb-2">About Doctor</p>
              <textarea onChange={(e) => {setAbout(e.target.value)}} value={about} name="w-full px-4 pt-2 border rounded" placeholder="Write about doctor" rows={5} id="" required></textarea>
            </div>
          <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
            Add Doctor
          </button>
      </div>
    </form>
  );
};

export default AddDoctor;
