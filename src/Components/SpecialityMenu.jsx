import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='py-12 px-6 flex flex-col items-center'>
      <h2 className='text-3xl font-bold mb-2 text-gray-800'>Find by Speciality</h2>
      <p className='text-gray-500 mb-6 text-center'>
        Browse through expert doctors at NovaHealth Care
      </p>

      {/* Horizontal scrollable container */}
      <div className='w-full max-w-5xl flex space-x-4 overflow-x-auto py-4 px-2 scrollbar-hide'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className='min-w-[150px] bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl transition-transform duration-300'>
            
            <img
              src={item.image}
              alt={item.speciality}
              className='w-20 h-20 object-cover rounded-full mb-3 transition-all duration-500 hover:-translate-y-2'
            />
            <p className='text-center font-semibold text-gray-700'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
