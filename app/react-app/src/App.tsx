import './App.css';
import Config from './components/Config';

function App() {
  return (
    <div className="App">
      <h1 style={{color:'#9c1de7'}}>Booking</h1>
      <Config day='Monday'></Config>
    </div>
  );
}

export default App;
