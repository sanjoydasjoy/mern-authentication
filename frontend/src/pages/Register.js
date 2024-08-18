import { useState } from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate(); 

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:1000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login') 
    }
    console.log(data)
  }

  return (
    <>
      <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <br /> <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br /> <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br /> <br />
          <input type="submit" value='Register' />
        </form>
      </div>
    </>
  );
}
