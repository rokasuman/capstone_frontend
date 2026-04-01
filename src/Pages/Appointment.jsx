import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState({});

  // Fetch doctor info
  const fetchDocInfo = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) {
      setDocInfo(doctor);
      setBookedSlots(doctor.slot_booked || {});
    }
  };

  // Generate slots
  const getAvailableSlot = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(today);
      dayStart.setDate(today.getDate() + i);

      if (i === 0 && today.getHours() >= 10) {
        dayStart.setHours(today.getHours() + 1, 0, 0, 0);
      } else {
        dayStart.setHours(10, 0, 0, 0);
      }

      const endTime = new Date(dayStart);
      endTime.setHours(21, 0, 0, 0);

      const timeSlots = [];
      let slotTimeClone = new Date(dayStart);

      while (slotTimeClone < endTime) {
        timeSlots.push({
          datetime: new Date(slotTimeClone),
          time: slotTimeClone.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        });

        slotTimeClone.setHours(slotTimeClone.getHours() + 1);
      }

      allSlots.push(timeSlots);
    }

    setDocSlot(allSlots);
  };

  // fetch fresh slots from backend
  const refreshSlots = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      );

      const updatedDoctor = data.doctors.find(
        (doc) => doc._id === docId
      );

      if (updatedDoctor) {
        setBookedSlots(updatedDoctor.slot_booked || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  BOOK APPOINTMENT
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      return toast.error("Please select a time slot");
    }

    try {
      const dateObj = docSlot[slotIndex][0].datetime;

      const slotDate = `${dateObj.getDate()}_${
        dateObj.getMonth() + 1
      }_${dateObj.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);

        setSlotTime("");

        //refresh from backend 
        await refreshSlots();

        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load doctor
  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [docId, doctors]);

  // Generate slots
  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
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
      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6">
        <div className="md:w-1/3">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full rounded-2xl"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <p className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} className="w-5" />
          </p>

          <p className="text-gray-600">
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className="text-gray-600">{docInfo.about}</p>

          <p className="font-medium">
            Fees:{" "}
            <span className="text-green-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-10 text-center">
        <p className="text-xl font-semibold">
          Available Booking Day and Time
        </p>

        {/* Days */}
        <div className="flex gap-3 overflow-x-auto mt-4">
          {docSlot.map((day, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`p-3 rounded-xl cursor-pointer ${
                index === slotIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <p>{daysOfWeek[day[0]?.datetime.getDay()]}</p>
              <p>
                {day[0]?.datetime.toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-6">
          {docSlot[slotIndex]?.map((slot, i) => {
            const dateObj = slot.datetime;

            const slotDate = `${dateObj.getDate()}_${
              dateObj.getMonth() + 1
            }_${dateObj.getFullYear()}`;

            const isBooked =
              bookedSlots[slotDate]?.includes(slot.time);

            return (
              <button
                key={i}
                disabled={isBooked}
                onClick={() => setSlotTime(slot.time)}
                className={`p-2 border rounded ${
                  isBooked
                    ? "bg-gray-300 cursor-not-allowed"
                    : slotTime === slot.time
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>

        {/* Selected */}
        {slotTime && (
          <p className="mt-4 text-green-600">
            Selected: {slotTime}
          </p>
        )}

        {/* Button */}
        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full"
        >
          Book Appointment
        </button>
      </div>

      <RelatedDoctors
        docId={docId}
        speciality={docInfo.speciality}
      />
    </div>
  );
};

export default Appointment;