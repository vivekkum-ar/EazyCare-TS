import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const {aToken,getDashData,cancelAppointment,dashData} = useContext(AdminContext)

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    if(aToken){
      getDashData()
      // console.log(dashData.latestAppointments)
    }
  }, [aToken])
  
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex p-4 items-center bg-white border-2 gap-2 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all ">
            <img
              src={assets.doctor_icon}
              alt={"doctor Icon"}
              className="w-14"
            />
            <div className="">
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex p-4 items-center bg-white border-2 gap-2 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.appointments_icon}
              alt={"doctor Icon"}
              className="w-14"
            />
            <div className="">
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex p-4 items-center bg-white border-2 gap-2 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.patients_icon}
              alt={"doctor Icon"}
              className="w-14"
            />
            <div className="">
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" className="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
          {
              dashData.latestAppointments && dashData.latestAppointments.map((item,index) => (
                <div className="flex items-center px-6 py-3 hover:bg-gray-100" key={index}>
                  <img className='rounded-full w-10' src={item.docData.image} alt="" />
                  <div className="flex-1 text-sm ">
                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                    <p className="text-gray-600">{`${item.slotDate.split("_")[0]} ${
                  months[item.slotDate.split("_")[1]]
                }, ${item.slotDate.split("_")[2]} | ${
                  item.slotTime
                }`}</p>
                  </div>
                  {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={() => {cancelAppointment(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard