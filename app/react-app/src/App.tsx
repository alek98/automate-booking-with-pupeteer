import './App.css';
import Bookings from './components/Bookings';
import { auth } from './firebase/Config';
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './components/Login';
import Logout from './components/Logout';
import History from './components/History';
function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      {user ?
        <header style={{ height: '5rem' }}>
          <span style={{ lineHeight: '5rem', float: 'left' }}>
            {user?.displayName}
          </span>
          <span style={{ lineHeight: '5rem', float: 'right' }}>
            <Logout />
          </span>
        </header>
        : ''}
      <h1 style={{ color: '#9c1de7' }}>Booking</h1>

      {user ?
      <div>
        <Bookings />
        <History />
      </div>
        :
        <Login />}
    </div>
  );
}

export default App;
