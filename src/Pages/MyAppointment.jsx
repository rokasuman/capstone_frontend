import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'


const MyAppointment = () => {
  const {doctors} = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 text-center '>My Appointment</p>
      <div>
        {
          doctors.slice(0,3).map((item,index)=>(
            <div className=" grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 "  key={index}>
              <div>
                  <img className='w-32 bg-indigo-50' src={item.image} alt='' />
              </div>
              <div className='flex-1 text-sm text-zinc-600 '>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p className='text-zinc-700 font-medium mt-1'>{item.speciality}</p>
                <p className='text-sm'><span className='font-semibold'>Date & Time</span> 25, july, 2025 | 8:30</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end mb-5'>
                <button className='text-sm text-white text-center sm:min-w-48 py-2 bg-blue-400 cursor-pointer rounded-xl  '>Pay Online</button>
                <button className='text-sm text-white text-center sm:min-w-48 py-2 bg-red-400 cursor-pointer rounded-xl'>Cancle Appointment</button>

              </div>

            </div>
          ))
        }

      </div>
    </div>
  )
}

export default MyAppointment