import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
  };

  // Generate available slots for 7 days
  const getAvailableSlot = async () => {
    setDocSlot([]);

    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); 

      // Set starting time
      if (i === 0) {
        // Today
        if (today.getHours() >= 10) {
          currentDate.setHours(today.getHours() + i);
        } else {
          currentDate.setHours(10);
        }
      } else {
        // Future days start at 10 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setHours(currentDate.getHours() + 1); 
      }

      allSlots.push(timeSlots);
    }

    setDocSlot(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  if (!docInfo) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading doctor info...
      </p>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10">
      {/* -----Doctor Info------ */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        {/*-------- Info ----------*/}
        <div className="md:w-2/3 flex flex-col gap-4">
          <p className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-6 h-6"
            />
          </p>

          <div className="flex items-center gap-4">
            <p className="text-gray-700">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
              {docInfo.experience} yrs
            </button>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold flex items-center gap-2">
              About
              <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
            </p>
            <p className="text-gray-600 mt-2">{docInfo.about}</p>
          </div>

          <p className="font-medium mt-4">
            Appointment fees:{" "}
            <span className="text-green-700">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/*--------- Booking Slots----------- */}
      <div className="mt-10 flex flex-col items-center">
        <p className="text-xl font-semibold mb-4 text-gray-800">
          Available Booking Day and Time
        </p>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlot.map((daySlots, index) => (
            <div
              key={index}
              className={` p-3 rounded-2xl border  ${
                index === slotIndex
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              } cursor-pointer min-w-[90px] text-center`}
              onClick={() => setSlotIndex(index)}
            >
              <p>{daysOfWeek[daySlots[0]?.datetime.getDay()]}</p>
              <p className="text-sm">
                {daySlots[0]?.datetime.toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          ))}
        </div>

        {/* --------Time Slots0----------- */}
        <div className="grid grid-cols-6 sm:grid-cols-6 gap-3 mt-6">
          {docSlot[slotIndex]?.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSlotTime(slot.time)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                slotTime === slot.time
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 cursor-pointer text-gray-700"
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {slotTime && (
          <p className="mt-4 text-green-600 font-medium">
            Selected Time: {slotTime}
          </p>
        )}
      </div>
      <div className="flex justify-center items-center mt-8 ">
        <button className="bg-blue-600 text-white py-3 px-3 rounded-full hover:cursor-pointer" onClick={()=>navigate('/my-appointment')}>Book Appointment</button>
      </div>

      {/*----listing the related doctors-----  */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    
    </div>
  );
};

export default Appointment;
