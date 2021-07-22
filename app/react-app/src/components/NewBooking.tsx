
const NewBooking = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursady', 'Friday', 'Saturday', 'Sunday']
  return (
    <div style={{ 
      border: '1px solid #581b98',
      borderRadius: '1rem',
      padding: '1rem',
      boxShadow: '0px 8px 15px rgb(0 0 0 / 10%)',
      background: '#581b9861'}}>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="day" style={{ display: 'block' }}>Day</label>
        <select name="day" >
          <option value=''>--Choose a day--</option>
          {days.map(day =>
            <option value={day}>{day}</option>)}
        </select>
      </span>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="location" style={{ display: 'block' }}>Name</label>
        <input type="text" name="name" />
      </span>

      <span style={{ display: 'inline-block' }}>
        <label htmlFor="location" style={{ display: 'block' }}>Location</label>
        <input type="text" name="location" />
      </span>

      <div >
        <button style={{ color: '#f3558e', backgroundColor: 'white' }}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  )
}

export default NewBooking
