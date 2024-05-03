import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext<Value>({
    doctors: [],
    currencySymbol: "$",
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
    token?: string | null;
    setToken?: any
    backendUrl?: string;
    userData?: any;
    setUserData?: any;
    loadUserProfileData?: any;
    getDoctorsData?:any;
}
const AppContextProvider = (props:any) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([]);
    const [userData,setUserData] = useState(false);
    const [token,setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

    const loadUserProfileData = async () => {
        try {
            const data = await axios.get(backendUrl+"/api/user/get-profile", {headers:{token}});
            if(data.data.success){
                setUserData(data.data.userData);
                // console.log(data.data.userData)
            } else{
                console.log("userData")
                toast.error(data.data.message);
            }
            
        } catch (error:any) {
            console.log(error);
            toast.error(error?.message);
        }
    }


    const getDoctorsData = async () => {
        try {
            const data = await axios.get(`${backendUrl}/api/doctor/list`);
            // console.log("data:",data);
            if(data.data.status){
                setDoctors(data.data.doctors);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
        }
    }

    const value:Value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }
    
    

    

    useEffect(() => {
        getDoctorsData();
        // toast.success("Doctors data fetch started!");
    },[])
    
    useEffect(() => {
        if(token){
            loadUserProfileData();
        }else{
            setUserData(false);
        }
    },[token])
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider