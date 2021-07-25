import { FC } from "react"
import { BookingSchedule } from "../models/BookingSchedule"
import './Booking.css'

const Booking: FC<{ bookingSchedule: BookingSchedule }> = ({ bookingSchedule }) => {
  return (
    <div className='data'>
      <p style={{ fontSize: '1.7rem'}}>
        {bookingSchedule.name}
      </p>
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
