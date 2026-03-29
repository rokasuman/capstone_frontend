import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, getAllDoctorsData } = useContext(AppContext);

  useEffect(() => {
    getAllDoctorsData();
  }, []);

  return (
    <div className="py-10 px-5 md:px-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold  text-gray-800 mb-2">
        Doctors to Book
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-2">
        {doctors.slice(0, 5).map((doctor) => (
          <div
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              window.scrollTo(0, 0);
            }}
            key={doctor._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  doctor.available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {doctor.available ? "Available" : "Not Available"}
              </span>

              <h2 className="text-lg font-semibold text-gray-800 mt-2">
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
        className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;