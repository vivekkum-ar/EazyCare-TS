import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext, Value } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  type Doctor = {
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
  };

  const [docInfo, setdocInfo] = useState<Doctor | null>(null);
  const [docSlot, setdocSlot] = useState<{ datetime: Date; time: string }[][]>(
    []
  );
  const [SlotIndex, setSlotIndex] = useState(0);
  const [SlotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    if (docInfo) {
      setdocInfo(docInfo);
    }
  };

  const getAvilableSlot = () => {
    setdocSlot([]);

    /* ------------------------------------ getting current date ------------------------------------ */
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      /* ----------------------------------- getting date with index ---------------------------------- */
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      /* --------------------------------- setting and endtime of the day -------------------------------- */
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      /* ---------------------------------------- Setting hours --------------------------------------- */
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      /* ------------------------------- loop through 30 mins interval -------------------------------*/
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        /* -------------------------------------- add slot to array ------------------------------------- */
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        /* ------------------------------ increment current time by 30 mins ----------------------------- */
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setdocSlot((prev: any) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvilableSlot();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* --------------------------------------- Doctor Details ---------------------------------------  */}
        <div className="">
          <img
            src={docInfo?.image}
            alt={docInfo.name}
            className="bg-primary w-full sm:max-w-72 rounded-lg"
          />
        </div>
        {/* ------------------------------ Doc Info name, degree, experience -----------------------------  */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-4xl font-medium text-gray-900">
            {docInfo.name}{" "}
            <img src={assets.verified_icon} className="w-5" alt="" />
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
            <p className="">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          {/* ------------------------------------ Doc Info about ------------------------------------  */}
          <div className="">
            <p className="flex items-center gap-1 text-sm font-medium mt-3 text-gray-900">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-gray-600">
              {currencySymbol} {docInfo.fees}
            </span>
          </p>
        </div>
          </div>
        {/* /* ---------------------------------------- Booking Slots ---------------------------------------  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="">Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            docSlot.length && docSlot.map((slot: any, index: number) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-xl cursor-pointer ${SlotIndex == index ? "bg-primary text-white" : "border border-gray-200"}`} id={index.toString()} key={index}>
                <p className=""> {slot[0] && dayOfWeek[slot[0].datetime.getDay()]} </p>
                <p className=""> {slot[0] && slot[0].datetime.getDate()} </p>
                <p className=""></p>
              </div>
            ))
          }
          </div>
          <div className="flex items-center w-full gap-3 mt-4 overflow-x-scroll">
            {docSlot.length > 0 && docSlot[SlotIndex]?.map((slot:any, index:number) => (
              <p onClick={() => setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time == SlotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`} key={index}>
                {slot.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button className="rounded-full bg-primary text-white gont-light px-14 py-3 my-6">Book an Appointment</button>
        </div>

        {/* /* ----------------------------------- Listing Related Doctors ----------------------------------  */}
        <RelatedDoctors docId={docId ? docId : ""} speciality={docInfo.speciality}></RelatedDoctors>
        </div>
    )
  );
};

export default Appointments;
