import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  // Filter doctors by speciality if provided
  const filteredDoctors = speciality
    ? doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
    : doctors

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        {speciality ? `${speciality} Specialists` : 'All Doctors'}
      </h1>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
            >
              <img
                src={doctor.image}
                alt=''
                className="w-full h-48 object-cover md:w-full sm:w-full sm:object-cover md:object-cover"
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
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No doctors found in this speciality.
        </p>
      )}
    </div>
  )
}

export default Doctors
