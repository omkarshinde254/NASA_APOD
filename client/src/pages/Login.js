import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e) {
    e.preventDefault();
    console.log('User Login');
      const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json();
    console.log(data);
    if (data.status === 'success' && data.user) {
      console.log('Login Successful');
      localStorage.setItem('token', data.user)
      alert('Login Successful');
      navigate('/home');
    }
    else {
      console.log('Login Failed');
      alert('Invalid username or password');
    }
  }

  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={loginUser}>
        <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        /> <br />

        <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        /> <br />

      <input type="submit" value="Login" />
      </form>

    </div>
    );
}

export default App;
