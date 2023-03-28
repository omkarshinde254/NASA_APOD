import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

function RegistrationForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e) {
    e.preventDefault();
    console.log('registerUser');
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === 'success') {
      // console.log('Registration Successful');
      // alert('Registration Successful');
      M.toast({ html: 'Registration Successfull', classes: 'green black-text' });
      navigate('/login');
    } else {
      // console.log('Registration Failed');
      // alert('Registration Failed, Something went wrong');
      M.toast({ html: 'Registration Failed, Something went wrong', classes: 'red black-text' });
    }
  }

  function navigateToLogin() {
    navigate('/login');
  }

  return (
    <main>
      <center>
        <div className="section"></div>

        <h5 className="indigo-text">Register for an account</h5>
        <div className="section"></div>

        <div
          className="z-depth-1 grey lighten-4 row"
          style={{
            display: 'inline-block',
            padding: '22px 48px 25px 48px',
            border: '1px solid #EEE',
            width: '25%'
          }}
        >
          <form className="col s12" onSubmit={registerUser}>
            <div className="row"></div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder='Enter your name'
                  className="validate"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder='Enter your email'
                  className="validate"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder='Enter your password'
                  className="validate"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>
              <label style={{float: "right"}}>
                <a className='blue-text' href="" onClick={navigateToLogin}><b>Login</b></a>
              </label>
            </div>

            <br />
            <center>
              <div className="row">
                <button
                  type="submit"
                  name="btn_register"
                  className="col s12 btn btn-large waves-effect indigo"
                >
                  Register
                </button>
              </div>
            </center>
          </form>
        </div>
      </center>

      <div className="section"></div>
      <div className="section"></div>
    </main>
  );
}

export default RegistrationForm;
