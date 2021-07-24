import { FC, useState } from "react"
import { Booking } from "../models/Booking"

const NewBooking: FC<Props> = (props) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday', 'Saturday', 'Sunday']
  const [day, setDay] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  const [showError, setShowError] = useState(false)

  const onSubmit = () => {
    const newBooking: Booking = { day, name, location, startTime, endTime }
    props.onSave(newBooking);
  }

  const isDisabled = (): boolean => {
    if (!day || !name || !location || !startTime || !endTime) return true;
    else return false;
  }

  return (
    <div style={{
      border: '1px solid #581b98',
      borderRadius: '1rem',
      padding: '1rem',
      boxShadow: '0px 8px 15px rgb(0 0 0 / 10%)',
      background: '#581b9861'
    }}>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="day" style={{ display: 'block' }}>Day</label>
        <select name="day" onChange={(e) => setDay(e.target.value)} >
          <option value=''>--Choose a day--</option>
          {days.map(day =>
            <option key={day} value={day}>{day}</option>)}
        </select>
      </span>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="location" style={{ display: 'block' }}>Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
      </span>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="location" style={{ display: 'block' }}>Location</label>
        <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} />
      </span>
      <span style={{ display: 'inline-block' }}>
        <label htmlFor="Time" style={{ display: 'block' }}>Start Time</label>
        <input type="time" name="time" onChange={(e) => setStartTime(e.target.value)} />
      </span>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="Time" style={{ display: 'block' }}>End Time</label>
        <input type="time" name="time" onChange={(e) => setEndTime(e.target.value)} />
      </span>

      <div>
        <button
          style={{ color: '#f3558e', backgroundColor: 'white' }}
          onClick={props.onCancel}>
          Cancel
        </button>

        <div
          style={{ display: 'inline-block' }}
          onMouseEnter={() => setShowError(true)}>
          <button onClick={() => onSubmit()} disabled={isDisabled()}>Save</button>
        </div>

      </div>

      {showError && isDisabled() ?
        <div style={{ color: '#bd0000' }}>
          Required Fields:
          {!day ? ' day, ' : ''}
          {!name ? 'name, ' : ''}
          {!location ? 'location, ' : ''}
          {!startTime ? 'startTime, ' : ''}
          {!endTime ? 'endTime ' : ''}
        </div>
        : ''}

    </div>
  )
}

interface Props {
  onCancel: () => void,
  onSave: (booking: Booking) => void,
}
export default NewBooking
