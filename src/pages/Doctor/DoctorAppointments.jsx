import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments,cancelAppointment,completeAppointment } = useContext(DoctorContext)
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
  const {calculateAge,currency} = useContext(AppContext)


  useEffect(() => {
    if(dToken){
      getAppointments()
    }
  },[dToken])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gsp-1 py-3 px-6 border-b">
          <p className="">#</p>
          <p className="">Patient</p>
          <p className="">Payment</p>
          <p className="">Age</p>
          <p className="">Date & Time</p>
          <p className="">Fees</p>
          <p className="">Action</p>
        </div>
        {appointments.reverse().map((appointment, index) => (
          <div
            className="hover:bg-gray-50 flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid  grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col gap-1 items-center text-gray-500 py-3 px-6 border-b"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={appointment.userData.image}
                alt=""
                className="w-8 rounded-full"
              />
              <p className="">{appointment.userData.name}</p>
            </div>
            <div className="">
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {appointment.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userData.dob)}
            </p>
            <p className="text-start">
              {`${appointment.slotDate.split("_")[0]} ${
                months[appointment.slotDate.split("_")[1]]
              }, ${appointment.slotDate.split("_")[2]} | ${
                appointment.slotTime
              }`}
            </p>
            <p className="">
              {currency} {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className="font-medium text-xs text-red-500">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="font-medium text-xs text-green-500">Completed</p>
            ) : (
              <div className="flex">
                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  onClick={() => cancelAppointment(appointment._id)}
                  className="w-10 cursor-pointer"
                />
                <img
                  src={assets.tick_icon}
                  alt="Verify"
                  onClick={() => completeAppointment(appointment._id)}
                  className="w-10 cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAppointments