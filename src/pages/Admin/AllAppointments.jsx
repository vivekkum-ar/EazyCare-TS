import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge,currency } = useContext(AppContext)
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
      getAllAppointments()
    }
  }, [aToken])
  
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white min-h-[60vh] border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Doctor Name</p>
          <p className="">Fees</p>
          <p className="">Action</p>
        </div>
        {
          appointments.map((item,index) => {
            return (
              <div
                className="flex flex-wrap sm:grid justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden ">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-8 rounded-full"
                  />
                  <p className="">{item.userData.name}</p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>
                <p className="max-sm:hidden">{`${item.slotDate.split("_")[0]} ${
                  months[item.slotDate.split("_")[1]]
                }, ${item.slotDate.split("_")[2]} | ${item.slotTime}`}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-8 rounded-full bg-gray-200"
                  />
                  <p className="">{item.docData.name}</p>
                </div>
                <p className="">
                  {currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> :<img
                  onClick={() => {
                    cancelAppointment(item._id);
                  }}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                )}
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default AllAppointments