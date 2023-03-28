import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';

function RegistrationForm() {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const hasAccess = hasGrantedAllScopesGoogle(
    // tokenResponse,
    'email',
    'user',
  );

  async function loginUser_outh(oauth) {
    // console.log('User Login Oauth');
    const response = await fetch(baseurl + '/api/login_outh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oauth
      }),
    })


    const data = await response.json();
    // console.log(data);
    if (data.status === 'success' && data.user) {
      localStorage.setItem('token', data.user)
      if (data.createuser) {
        M.toast({ html: 'Created User', classes: 'green black-text' })
      }
      M.toast({ html: 'Login Successfull', classes: 'green black-text' })
      navigate('/home');
    }
    else {
      M.toast({ html: 'Invalid username or password', classes: 'red black-text' })
    }
  }

  async function registerUser(e) {
    e.preventDefault();
    // console.log('registerUser');
    const response = await fetch(baseurl + '/api/register', {
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
                  required="" aria-required="true"
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
                  required="" aria-required="true"
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
                  required="" aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label style={{ float: "right" }}>
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
            <div className='divider'></div>
            <div style={{ padding: '10px 0px 0px 0px' }} >
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    loginUser_outh(credentialResponse)
                    // console.log(credentialResponse.email);
                  }}
                  onError={() => {
                    // console.log('Login Failed');
                    M.toast({ html: 'Registration Failed, Something went wrong', classes: 'red black-text' });
                  }}
                />
              </GoogleOAuthProvider>
            </div>

          </form>
        </div>
      </center>

      <div className="section"></div>
    </main>
  );
}

export default RegistrationForm;
