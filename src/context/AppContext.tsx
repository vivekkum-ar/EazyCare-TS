import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext<Value>({
    doctors: [],
    currencySymbol: "$"
});

export interface Value {
    doctors: {
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
    }[];
    currencySymbol: string;
}
const AppContextProvider = (props:any) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([]);
    const value:Value = {
        doctors,
        currencySymbol
    }
    
    const getDoctorsData = async () => {
        try {
            const data = await axios.get(`${backendUrl}/api/doctor/list`);
            // console.log("data:",data);
            if(data.data.status){
                setDoctors(data.data.doctors);
            }
        } catch (error:any) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        getDoctorsData();
        // toast.success("Doctors data fetch started!");
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider