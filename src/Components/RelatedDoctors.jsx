import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
    const {doctors } = useContext(AppContext)
    const [relDoc,setRelDoc ] = useState([])

    const navigate = useNavigate()


    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }


    },[doctors,speciality,docId])
  return (
    <div className=" max-w-[1200px] mx-auto px-5 py-10 felx flex-col items-center ">
      <h1 className="text-3xl font-semibold m-2 text-center text-gray-800"> Related Doctors to Book </h1>
      <p className="text-gray-600 mb-4 text-center">
        Our doctors have years of experience providing quality care.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {relDoc.slice(0, 5).map((doctor, index) => (
          <div
            onClick={() => {navigate(`/appointment/${doctor._id}`);scrollTo(0,0)}}
            key={index}
            className="bg-white  rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-green-600 transition duration-300 hover:text-green-800">
                  Available
                </p>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {doctor.name}
              </h2>
              <p className="text-gray-500">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default RelatedDoctors