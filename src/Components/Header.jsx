import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-100 rounded-3xl px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-6 m-auto md:py-[5vw] md:mb-[15px] '>
            <p className='text-3xl md:text-4xl lg:text-5xl text-blue-600 font-semibold leading-tight md:leading-tight lg:leading-tight '>Book Appointment <br/> with Trusted Doctors in Nova HealthCare.
               
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-black text-sm font-light '>
                <img className='w-28' src={assets.group_profiles} alt=''/>
                <p>Browse through our Experience list of the doctors </p>
            </div>
            <a href='#speciality' className='flex items-center gap-2 bg-blue-600 px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book appointment <img className='w-3 filter invert brightness-0' src={assets.arrow_icon} alt=''/>
            </a>

        </div>
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''/>

        </div>
    </div>
  )
}

export default Header