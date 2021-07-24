import { createRef, useState } from "react"
import { db } from "../firebase/Config"
import { BookingSchedule } from "../models/Booking"
import Days from "./Days"
import NewBooking from "./NewBooking"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Snackbar, { useSnackBar } from "./Snackbar"

const Bookings = () => {

  const bookingSchedulesRef = db.collection('bookingSchedules')
  const [bookingSchedules] = useCollectionData<BookingSchedule>(bookingSchedulesRef)


  const [showForm, setShowForm] = useState(false)
  const toggleNewBooking = () => setShowForm(!showForm)

  const {isActive, msg, openSnackBar} = useSnackBar()

  const onSave = async (newBookingSchedule: BookingSchedule) => {
    try {
      console.log('saving', newBookingSchedule);
      await bookingSchedulesRef.add(newBookingSchedule)
      openSnackBar('successfully added.')
    } catch (error) {
      console.log(error)
      openSnackBar('problem while adding.')
    }
    toggleNewBooking()
  }

  return (
    <div>
      <Snackbar message={msg} isActive={isActive}/>
      <h2 style={{ textAlign: 'center', color: '#5c1c9e' }}>Schedule</h2>

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
