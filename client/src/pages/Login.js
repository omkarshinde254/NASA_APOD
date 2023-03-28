import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import gouth from '../img/btn_google_signin.png';
import { GoogleLogin } from 'react-google-login';
// import env from 'react-dotenv';

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

  function responseGoogle(response) {
    console.log(response);
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
          <form className="col s12" onSubmit={loginUser}>
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

            <GoogleLogin
              client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <img className='col s12 waves-effect' style={{ padding: '10px 0px 0px 0px' }} src={gouth}></img>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />

          </form>
        </div>
      </center>

      <div className="section"></div>
      <div className="section"></div>
    </main>
  );
}

export default App;
