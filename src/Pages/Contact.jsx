import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 '>
        <p className='font-semibold'>CONTACT US</p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-2xl' src={assets.contact_image} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg '>Our OFFICE</p>
          <p className='text-gray-500'>77/81, Church street, Lidcombe</p>
          <p className='text-gray-500'>Phone: 0987654543 <br/> Email: NovaHealth@gmail.com</p>
          <p className='font-semibold text-lg'>Career at NovaHealth Care</p>
          <p className='text-gray-500'>Learn more about our teams and job opening </p>
          <button className=' px-8 py-4 text-sm rounded-full bg-blue-400 text-white hover:cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact