import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors, getAllDoctorsData } = useContext(AppContext);

  //  Search state
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllDoctorsData();
  }, []);

  //  Filter by speciality first
  const specialityFilteredDoctors = speciality
    ? doctors.filter(
        (doc) =>
          doc.speciality?.toLowerCase() === speciality.toLowerCase()
      )
    : doctors;

  //  apply search filter
  const filteredDoctors = specialityFilteredDoctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/*  SEARCH INPUT */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search doctor by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          {speciality ? `${speciality} Specialists` : "Our Doctors"}
        </h1>

        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
          Meet our professional doctors with years of medical experience who are
          ready to provide the best care and consultation.
        </p>

        {/* DOCTORS LIST */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${doctor._id}`);
                  window.scrollTo(0, 0);
                }}
                className="group bg-white rounded-2xl shadow-md overflow-hidden 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Doctor Image */}
                <div className="overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="p-5">
                  {/* Availability */}
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

                  {/* Name */}
                  <h2 className="text-lg font-semibold text-gray-800">
                    {doctor.name}
                  </h2>

                  {/* Speciality */}
                  <p className="text-gray-500 text-sm mt-1">
                    {doctor.speciality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">
              No doctors found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;