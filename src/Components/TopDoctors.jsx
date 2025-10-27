import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-10 px-5 md:px-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Doctors to Book</h1>
      <p className="text-gray-600 mb-6">
        Our doctors have years of experience providing quality care.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 5).map((doctor, index) => (
          <div
          onClick={() => {navigate(`/appointment/${doctor._id}`);scrollTo(0,0)}}
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer"
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
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 hover:cursor-pointer"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
