import './App.css';
import Bookings from './components/Bookings';
import { db } from './firebase/Config';
function App() {
  db.doc('users/alek').set({name: 'alek', surname: 'vuj'})
  return (
    <div className="App">
      <h1 style={{color:'#9c1de7'}}>Booking</h1>
      <Bookings></Bookings>
    </div>
  );
}

export default App;
