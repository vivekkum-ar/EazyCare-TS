import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

interface RelatedDoctorsProps {
  // Add your prop types here
  docId:string
  speciality:string
}

type doctorsD = {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    address: {
        line1: string;
        line2: string;
    };
}[]

const RelatedDoctors: React.FC<RelatedDoctorsProps> = ({docId,speciality}) => {
const {doctors} = useContext(AppContext);
const [relDocs, setrelDocs] = useState<doctorsD>([]);
const navigate = useNavigate();
useEffect(() => {
    if(doctors.length > 0 && speciality){
        const doctorsData = doctors.filter((doctor) => doctor.speciality === speciality && doctor._id !== docId);
        setrelDocs(doctorsData);
    }
}, [doctors,speciality,docId])

    return (
        <div className="flex flex-col items-center py-16 gap-4 text-gray-800 md:mx-10">
        <h1 className="text-3xl font-medium">Find by Speciality</h1>
          <p className="sm:w-1/3 text-center text-sm line-clamp-2 ">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
          <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-6">
            {relDocs.slice(0,5).map((doctor,index) => (
              <div key={index} onClick={() => {navigate(`/appointment/${doctor._id}`); scrollTo(0,0);}} className="flex flex-col items-center gap-4 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                <img src={doctor.image} alt="" className="bg-blue-50" />
                <div className="p-4 justify-start w-full flex flex-col">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p className="">Avilable</p>
                </div>
                  <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>              
              </div>
            ))}
          </div>
          <button className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10" onClick={() => { navigate("/doctors"); scrollTo(0,0); }}>More</button>
      </div>
  )
}

export default RelatedDoctors