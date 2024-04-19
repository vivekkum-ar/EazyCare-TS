import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext<Value>({
    doctors: [],
    currencySymbol: ""
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

    const value:Value = {
        doctors,
        currencySymbol
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider