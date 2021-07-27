import { useCollectionData } from "react-firebase-hooks/firestore"
import { db } from "../firebase/Config"
import { BookingHistory } from "../models/BookingHistory"

const History = () => {
  const [bookingHistory] = useCollectionData<BookingHistory>(
    db.collection('bookingHistory')
      .orderBy('bookedAt', 'desc')
      .limit(10),
    { idField: 'id' })

  const fieldClass = { color: '#4b2a6d', marginRight: '1rem' }

  return (
    <div style={{ marginBottom: '5rem' }}>
      <h2 style={{ textAlign: 'center', color: '#5c1c9e' }}>History</h2>

      <div>
        {bookingHistory?.map(bookingHistory => (
          <div key={bookingHistory.id} style={{ marginBottom: '1rem' }}>
            <p style={{ ...fieldClass, fontSize: '1.6rem', display: 'inline-block' }}>
              {bookingHistory.bookedAt.toDate().toLocaleString('sr')}
              - {bookingHistory.name}
            </p>
            <div>
              <p style={{ display: 'inline-block' }}>
                <span className='material-icons-outlined'>schedule</span>
                {bookingHistory.startTime}-{bookingHistory.endTime}
              </p>
              <p style={{ display: 'inline-block' }}>
                <span className='material-icons-outlined'>place</span>
                {bookingHistory.location}
              </p>
            </div>

            <hr style={{ borderColor: '#9c1de7b8' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
