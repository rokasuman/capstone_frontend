import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [payingId, setPayingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const [appointments, setAppointments] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotedDateFormat = (slotDate) => {
    const dataArray = slotDate.split("_")
    return dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers: { token } }
      )
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success("Appointment deleted Successfully")
        getUserAppointments()
      } else toast.error(data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handlePay = async (appointmentId) => {
    if (!stripe || !elements || loading) return

    setLoading(true)
    setPayingId(appointmentId)

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/create-payment",
        { appointmentId },
        { headers: { token } }
      )

      const clientSecret = data.clientSecret
      if (!clientSecret) throw new Error("Payment failed")

      const card = elements.getElement(CardElement)
      if (!card) throw new Error("Card not found")

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card }
      })

      if (paymentResult.error) {
        toast.error(paymentResult.error.message)
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        await axios.post(
          backendUrl + "/api/user/confirm-payment",
          { appointmentId },
          { headers: { token } }
        )

        toast.success("Payment Successful")
        getUserAppointments()
      }

    } catch (error) {
      console.log(error)
      toast.error("Payment Failed")
    } finally {
      setLoading(false)
      setPayingId(null)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div className="min-h-screen flex flex-col">

     
      <div className="px-4 flex-1">
        <h1 className='pb-3 mt-12 font-extrabold text-blue-700 text-center text-2xl'>
          My Appointment
        </h1>

        <div>
          {appointments.slice(0, 3).map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2" key={index}>
              
              <div>
                <img className='w-32 bg-indigo-50 rounded-lg' src={item.docData.image} alt={item.docData.name} />
              </div>

              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p className='text-zinc-700 font-medium mt-1'>{item.docData.speciality}</p>
                <p className='text-sm'>
                  <span className='font-semibold'>Date & Time:</span>{" "}
                  {slotedDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className='flex flex-col gap-2 justify-end mb-5'>
                {!item.cancel && !item.isCompleted && (
                  <>
                    {payingId === item._id ? (
                      <div className="p-2 border rounded-lg">
                        <CardElement options={{ hidePostalCode: true }} />
                        <button
                          onClick={() => handlePay(item._id)}
                          disabled={loading}
                          className={`mt-2 text-sm text-white py-2 rounded-xl w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'}`}
                        >
                          {loading ? "Processing..." : "Pay Now"}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPayingId(item._id)}
                        className='text-sm text-white text-center sm:min-w-48 py-2 bg-blue-400 cursor-pointer rounded-xl'
                      >
                        Pay Online
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='text-sm text-white text-center sm:min-w-48 py-2 bg-red-400 cursor-pointer rounded-xl'
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}

                {item.cancel && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded-xl text-rose-500'>
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className='text-sm text-white text-center sm:min-w-48 py-2 bg-green-400 cursor-pointer rounded-xl'>
                    Completed
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointment