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
            Nova HealthCare is a state-of-the-art medical facility dedicated to providing exceptional
            healthcare services to the Northern Beaches community. Our hospital combines advanced
            technology with compassionate care, ensuring patients receive personalized treatment in a
            comfortable and safe environment. At Nova HealthCare, we prioritise patient well-being,
            innovation, and community health, offering a wide range of medical specialties and
            wellness programs. Our experienced team of doctors, nurses, and healthcare professionals
            work collaboratively to deliver high-quality care, making Nova HealthCare a trusted choice
            for your health and recovery needs.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center md:text-left text-xl my-4">
        <h1 className="font-semibold">WHY CHOOSE US</h1>
      </div>

      <div className="flex flex-col md:flex-row mb-10 gap-6">
        <div className="border rounded-2xl px-8 md:px-12 py-8 flex flex-col gap-3 bg-blue-100 hover:bg-blue-200 transition-all duration-300 cursor-pointer">
          <b>Efficiency:</b>
          <p className="text-gray-700">
            NovaHealth Care is a modern medical facility providing high-quality, patient-focused care to the Northern Beaches community.
          </p>
        </div>

        <div className="border rounded-2xl px-8 md:px-12 py-8 flex flex-col gap-3 bg-blue-100 hover:bg-blue-200 transition-all duration-300 cursor-pointer">
          <b>Convenience:</b>
          <p className="text-gray-700">
            We prioritise convenience with easily accessible locations, flexible appointment scheduling, and streamlined services for timely care.
          </p>
        </div>

        <div className="border rounded-2xl px-8 md:px-12 py-8 flex flex-col gap-3 bg-blue-100 hover:bg-blue-200 transition-all duration-300 cursor-pointer">
          <b>Personalization:</b>
          <p className="text-gray-700">
            We provide personalized care tailored to each patient’s unique needs.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
