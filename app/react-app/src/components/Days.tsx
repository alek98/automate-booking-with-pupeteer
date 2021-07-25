import { FC } from 'react';
import Day from './Day';
import { BookingSchedule } from '../models/BookingSchedule';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';


const Days:FC<Props> = ({bookingSchedules}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday', 'Saturday', 'Sunday']
  return (
    <div style={{marginBottom: '5rem'}}>
        {days.map(day =>
          <Day key={day} day={day} bookingSchedules={bookingSchedules} ></Day>
        )}
    </div>
  )
}

interface Props {
  bookingSchedules: Data<BookingSchedule>[] | undefined,
}

export default Days