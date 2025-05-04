import { createContext } from "react";

export const AppContext = createContext("");



const AppContextProvider = (props) => {

  const currency = "$"
  const calculateAge = (dob) => {
  const today = new Date()
  const birthDate = new Date(dob)
  const Age = today.getFullYear() - birthDate.getFullYear()

  return(Age)
}


  const value = {
    calculateAge,
    currency
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
