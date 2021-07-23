import { useState } from "react"
import { Booking } from "../models/Booking"
import Days from "./Days"
import NewBooking from "./NewBooking"

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showForm, setShowForm] = useState(false)

  const toggleNewBooking = () => setShowForm(!showForm)
  
  const onSave = (booking: Booking) => {
    console.log('saving', booking);
    setBookings([...bookings, booking])
    toggleNewBooking()
  }

  return (
    <div>
      {showForm ? 
      <NewBooking onCancel={toggleNewBooking} onSave={onSave} /> :
        <button
          onClick={toggleNewBooking}
          style={{ fontSize: '1.3rem', textAlign: 'center', margin: 'auto', display: 'block' }}>
          New booking
        </button>}
      <Days />
    </div>
  )
}

export default Bookings
