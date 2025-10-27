import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-blue-100 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 my-10'>
      
      {/* --- Left Side --- */}
      <div className='md:w-1/2 flex flex-col items-start text-center md:text-left gap-5 py-8 sm:py-10 md:py-16 lg:py-24'>
        <h1 className='text-3xl md:text-4xl font-bold text-blue-800'>
          Welcome to Nova Health Care
        </h1>
        <p className='text-gray-700 leading-relaxed'>
          Where compassion meets innovation. At Nova Health Care, we’re committed to providing 
          world-class medical services with a personal touch. Our team of experienced doctors, 
          advanced technology, and patient-centered approach ensure you receive the best care 
          possible — every step of the way.
        </p>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300'>
          Create Account
        </button>
      </div>

      {/* --- Right Side --- */}
      <div className='md:w-1/2 mt-8 md:mt-0 flex justify-center'>
        <img 
          src={assets.appointment_img} 
          alt='' 
          className='w-full max-w-md rounded-xl '
        />
      </div>
    </div>
  )
}

export default Banner
