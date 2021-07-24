import Day from './Day';

const Days = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday', 'Saturday', 'Sunday']
  return (
    <div>

      <div>
        {days.map(day =>
          <Day key={day} day={day}></Day>
        )}
      </div>
    </div>
  )
}

export default Days
