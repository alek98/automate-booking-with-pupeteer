import { FC } from "react"
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types"
import { BookingSchedule } from "../models/BookingSchedule"
import Booking from "./Booking"

const Config: FC<Props> = ({ day, bookingSchedules }) => {

  const schedulesForToday = bookingSchedules?.filter(bookingSchedule =>
    bookingSchedule.day.toLowerCase() === day.toLowerCase()
  )

  return (
    <div>
      <h2 className='day'>{day}</h2>
      {schedulesForToday?.length ?
        schedulesForToday.map(bookingSchedule =>
          <Booking bookingSchedule={bookingSchedule} key={bookingSchedule.id} />
        )
        :
        <div style={{width: '90%', margin: 'auto', color: '#4b2a6dfa'}}>
          Empty schedule for {day}
        </div>}
    </div>
  )
}

interface Props {
  day: string,
  bookingSchedules: Data<BookingSchedule>[] | undefined,

}



export default Config