import { auth } from "../firebase/Config"

const Logout = () => {
  const signOut = () => {
    auth.signOut();
  }
  return (
    <div>
      <button
        style={{ backgroundColor: 'black', fontSize:'0.8rem' }}
        onClick={signOut}>
        Log Out
      </button>
    </div>
  )
}

export default Logout
