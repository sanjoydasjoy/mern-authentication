import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:1000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.status === 'ok' && data.user) {
      localStorage.setItem('token', data.user); // Store token in localStorage

      alert('Login successful');
      navigate('/dashboard'); // Redirect to dashboard
    }
    else {
      alert('Invalid email or password');
    }
    console.log(data);
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br /><br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br /><br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
}
