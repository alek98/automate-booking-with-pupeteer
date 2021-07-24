import { useState } from "react";
import { auth } from "../firebase/Config"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ display: 'block' }}>
          <label htmlFor="email" style={{ display: 'block' }}>Email</label>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </span>
        <span style={{ display: 'block' }}>
          <label htmlFor="password" style={{ display: 'block' }}>Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </span>

        <button
          onClick={signIn}
          style={{ fontSize: '1.3rem', textAlign: 'center', margin: 'auto', display: 'block', marginTop: '1rem' }}>
          Log In
        </button>
      </div>
    </div>
  )
}

export default Login
