import { useState } from "react"
import Days from "./Days"
import NewBooking from "./NewBooking"

const Bookings = () => {
  const [bookings, setBookings] = useState([])

  return (
    <div>
      {/* <button
        style={{ fontSize: '1.3rem', textAlign: 'center', margin: 'auto', display: 'block' }}>
        New booking
      </button> */}
      <NewBooking/>
      <Days/>

    </div>
  )
}

export default Bookings
