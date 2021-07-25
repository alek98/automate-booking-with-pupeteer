import { FC, useState } from "react"
import { db } from "../firebase/Config"
import { BookingSchedule } from "../models/BookingSchedule"
import './Booking.css'
import { useSnackBar } from "./Snackbar"

const Booking: FC<{ bookingSchedule: BookingSchedule }> = ({ bookingSchedule }) => {

  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const toggleShowConfirmButton = () => setShowConfirmButton(!showConfirmButton)


  const onDelete = async () => {
    try {
      const bookingSchedulesRef = db.collection('bookingSchedules')
      await bookingSchedulesRef.doc(bookingSchedule.id).delete()
      toggleShowConfirmButton()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='data'>
      <div>
        <p style={{ fontSize: '1.7rem', display: 'inline-block' }}>
          {bookingSchedule.name}
        </p>
        {showConfirmButton ?
          <span >
            <button
              onClick={onDelete}
              className='confirm-btn'>
              Confirm Delete
            </button>
            <button
              onClick={toggleShowConfirmButton}
              className='cancel-btn'>
              Cancel
            </button>
          </span>
          :
          <button
            className='delete-btn'
            onClick={toggleShowConfirmButton}>
            <span className='material-icons'>delete</span>
          </button>
        }
      </div>

      <p style={{ display: 'inline-block' }}>
        <span className='material-icons-outlined'>place</span>
        {bookingSchedule.location}
      </p>
      <p style={{ display: 'inline-block' }}>
        <span className='material-icons-outlined'>schedule</span>
        {bookingSchedule.startTime}-{bookingSchedule.endTime}
      </p>
    </div>
  )
}

export default Booking
