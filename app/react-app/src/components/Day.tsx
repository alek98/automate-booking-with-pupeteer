import { FC } from "react"
import './Day.css'

const Config: FC<Props> = ({ day }) => {
  return (
    <div>
      <h2 className='day'>{day}</h2>
      <div className='data'>
        <p style={{ fontSize: '1.7rem' }}>Bodypump</p>
        <p>
          <span className='material-icons-outlined'>place</span>
          Skanor
        </p>
        <p>
        <span className='material-icons-outlined'>schedule</span>
          07:00-08:30
        </p>
        <p>
        <span className='material-icons-outlined'>info</span>
          Lilla Salen - LES MILLS Virtuell
        </p>
      </div>
    </div>
  )
}

interface Props {
  day: string
}



export default Config