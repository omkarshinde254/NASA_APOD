import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  async function loginUser(oauth, e) {
    e.preventDefault();
    // console.log('User Login');
    const response = await fetch(baseurl + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        oauth
      }),
    })


    const data = await response.json();
    // console.log(data);
    if (data.status === 'success' && data.user) {
      // console.log('Login Successful');
      localStorage.setItem('token', data.user)
      // alert('Login Successful');
      M.toast({ html: 'Login Successfull', classes: 'green black-text' })
      navigate('/home');
    }
    else {
      // console.log('Login Failed');
      M.toast({ html: 'Invalid username or password', classes: 'red black-text' })
      // alert('Invalid username or password');
    }
  }

  function navigateToRegister() {
    navigate('/register');
  }

  function navigateGoogleAuth() {
    navigate('/auth/google');
  }

  return (
    <main>
      <div className="section"></div>
      <center>
        <h5 className="pink-text">Welcome to APOD!</h5>
        <h5 className="indigo-text">Login into your account</h5>
        <div className="section"></div>

        <div className="z-depth-1 grey lighten-4 row" style={{ display: "inline-block", padding: "22px 48px 25px 48px", border: "1px solid #EEE", width: "25%" }}>
          <form className="col s12" onSubmit={(e) => loginUser(null, e)}>
            <div className='row'></div>

            <div className='row'>
              <div className='input-field col s12'>
                <input placeholder='Enter your email' className='validate' name='email' id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12'>
                <input placeholder="Enter your password" className='validate' type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <label style={{ float: "right" }}>
                <a className='blue-text' href='' onClick={navigateToRegister}><b>Create account</b></a>
              </label>
            </div>

            <br />
            <center>
              <div className='row'>
                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
            <div className='divider' ></div>
            {/* <img className='col s12 waves-effect' style={{ padding: '10px 0px 0px 0px' }} src={gouth} onClick={navigateGoogleAuth}></img> */}

            <div style={{ padding: '10px 0px 0px 0px' }} >
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    loginUser_outh(credentialResponse)
                    // console.log(credentialResponse);
                  }}
                  onError={() => {
                    // console.log('Login Failed');
                    M.toast({ html: 'Login Failed, Something went wrong', classes: 'red black-text' });
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

export default App;
