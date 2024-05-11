import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

// Declare Razorpay on the global window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
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
  const getUserAPpointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order: any) => {
    const options = {
      key: import.meta.env.VITE_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response:any) => {
        try {
          const {data} = await axios.post(backendUrl+"/api/user/verify-razorpay",response,{headers:{token}})
          if(data.status){
            getUserAPpointments()
            navigate("/my-appointments")
          }
        } catch (error:any) {
          console.log(error)
          toast.error(error.message)
        }
      } 
    };
    const rzp = new window.Razorpay(options)
    rzp.open()
  };

  const appointmentRazorpay = async (appointmentId: any) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.status) {
      initPay(data.order)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAPpointments();
      getDoctorsData();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId: string) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      console.log(data);
      if (data.status) {
        toast.success(data.message);
        getUserAPpointments();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="">
        {appointments.map((appointment: any, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div className="">
              <img
                className="w-32 bg-indigo-50 rounded"
                src={appointment.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {appointment.docData.name}
              </p>
              <p className="text-neutral-800 font-semibold">
                {appointment.docData.speciality}
              </p>
              <p className="text-zinc-700 font-medium mt-1">{"Address:"}</p>
              <p className="text-xs">{appointment.docData.address.line1}</p>
              <p className="text-xs">{appointment.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  {"Date & Time: "}
                </span>{" "}
                {`${appointment.slotDate.split("_")[0]} ${
                  months[appointment.slotDate.split("_")[1]]
                }, ${appointment.slotDate.split("_")[2]} | ${
                  appointment.slotTime
                }`}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-3 justify-end ">
            {!appointment.cancelled && appointment.payment && !appointment.isCompleted &&  <button className="sm:min-w-48 py-2 border text-stone-500 bg-indigo-50"> Paid </button> }
              {!appointment.cancelled && !appointment.payment && !appointment.isCompleted && (
                <button
                  className="text-sm text-stone-500 text-centersm:min-w-40 py-2 border rounded px-4 hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => appointmentRazorpay(appointment._id)}
                >
                  {" "}
                  Pay Online
                </button>
              )}
              {!appointment.cancelled && !appointment.isCompleted && (
                <button
                  className="text-sm text-stone-500 text-centersm:min-w-40 py-2 border rounded px-4 hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => cancelAppointment(appointment._id)}
                >
                  Cancel Appointment
                </button>
              )}
              {appointment.cancelled && !appointment.isCompleted && (
                <button
                  disabled
                  className="flex flex-row gap-1 px-1 sm:min-w-48 py-2 border border-red-500 rounded text-red-500"
                >
                  <Icon
                    icon="healthicons:cancel-outline-24px"
                    width="24"
                    height="24"
                  />
                  Appointment Cancelled
                </button>
              )}
              {appointment.isCompleted && (<button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>)}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default MyAppointments;
