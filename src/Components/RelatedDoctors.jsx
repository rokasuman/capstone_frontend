import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors, getAllDoctorsData } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  const navigate = useNavigate();

  // Fetch doctors
  useEffect(() => {
    getAllDoctorsData();
  }, []);

  // Filter related doctors
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) =>
          doc.speciality?.toLowerCase() === speciality?.toLowerCase() &&
          doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col items-center">
      
      <h1 className="text-3xl font-semibold m-2 text-center text-gray-800">
        Related Doctors to Book
      </h1>

      <p className="text-gray-600 mb-4 text-center">
        Our doctors have years of experience providing quality care.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {relDoc.slice(0, 5).map((doctor) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              window.scrollTo(0, 0);
            }}
            key={doctor._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              
            
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    doctor.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>

                <p
                  className={`text-sm font-medium ${
                    doctor.available ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>

              {/* Doctor Name */}
              <h2 className="text-lg font-semibold text-gray-800">
                {doctor.name}
              </h2>

              {/* Speciality */}
              <p className="text-gray-500">{doctor.speciality}</p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RelatedDoctors;