import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$'
  //import backend url 
  const backendUrl = import.meta.env.VITE_BACKEND_URL 

  //state to store the doc
const [doctors,setDoctors] = useState([])  


  const value = {
    doctors,
    currencySymbol
  
    
  };
  //api to call doc from backend 
  const getAllDoctorsData = async()=>{
  try {
    const {data} = await axios.get(backendUrl + "/api/doctor/list")
    if(data.success){
      setDoctors(data.doctors)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
  }
  useEffect(()=>{
     getAllDoctorsData()
  },[])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
