import { useState } from "react"
import Days from "./Days"
import NewBooking from "./NewBooking"

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [showForm, setShowForm] = useState(false)
  const toggleNewBooking = () => setShowForm(!showForm)
  return (
    <div>
      {showForm ? 
      <NewBooking onCancel={toggleNewBooking} onSave={toggleNewBooking} /> :
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
