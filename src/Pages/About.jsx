import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-5 md:px-20 py-10">

      {/* About Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold">ABOUT US</h1>
      </div>

      {/* Image and Text Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
        <img
          className="w-full md:max-w-[360px] mx-auto rounded-lg shadow-md"
          src={assets.about_image}
          alt="Nova Health Care"
        />

        <div className="flex flex-col justify-center gap-4 md:w-2/4 text-center md:text-left">
          <p className="text-lg font-semibold">Welcome to NovaHealth Care</p>

          <p className="text-justify leading-relaxed text-black">
            NovaHealth Care is a state-of-the-art medical facility dedicated to providing exceptional,
            patient-centred healthcare services to the Northern Beaches community. Our hospital combines
            advanced technology with compassionate care, ensuring patients receive personalised treatment in a
            comfortable and supportive environment.
          </p>

          <p className="text-justify leading-relaxed text-black">
            We prioritise well-being, innovation, and community health across a wide range of medical
            specialties and wellness programs. Our experienced team of doctors, nurses, and healthcare
            professionals work collaboratively to deliver high-quality care, making NovaHealth Care a
            trusted choice for your health and recovery needs.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center md:text-left text-xl my-4">
        <h1 className="font-semibold">WHY CHOOSE US</h1>
      </div>

      <div className="flex flex-col md:flex-row mb-10 gap-6">

        {/* Efficiency Box */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-3 
                        bg-blue-100 hover:bg-blue-200 transition-all duration-300 
                        cursor-pointer shadow-md min-h-[220px] flex-1">
          <b className="text-lg">Efficiency:</b>
          <p className="text-gray-700 text-sm md:text-base">
            NovaHealth Care operates with modern systems, minimising delays while providing
            high-quality, patient-focused medical care.
          </p>
        </div>

        {/* Convenience Box */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-3 
                        bg-blue-100 hover:bg-blue-200 transition-all duration-300 
                        cursor-pointer shadow-md min-h-[220px] flex-1">
          <b className="text-lg">Convenience:</b>
          <p className="text-gray-700 text-sm md:text-base">
            With accessible locations, flexible appointments, and streamlined services, we ensure
            a smooth and hassle-free healthcare experience.
          </p>
        </div>

        {/* Personalization Box */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-3 
                        bg-blue-100 hover:bg-blue-200 transition-all duration-300 
                        cursor-pointer shadow-md min-h-[220px] flex-1">
          <b className="text-lg">Personalization:</b>
          <p className="text-gray-700 text-sm md:text-base">
            Every patient receives tailored care plans designed to meet their unique medical needs.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
