import { FC } from "react"
import './Config.css'

const Config: FC<Props> = ({ day }) => {
  return (
    <div>
      <h2>{day}</h2>
      <div className='data'>
        <p style={{fontSize: '1.7rem'}}>Name: Bodypump</p>
        <p>Location: Skanor</p>
        <p>Time: 07:00-08:30</p>
        <p>Description: Lilla Salen - LES MILLS Virtuell</p>
      </div>
    </div>
  )
}

interface Props {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursady' | 'Friday' | 'Saturday' | 'Sunday'
}



export default Config