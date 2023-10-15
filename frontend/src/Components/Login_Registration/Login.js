import React, { useState } from "react";
import Axios from 'axios';
import "./Login.css";
import NavigateBar from "../Navigation/NavigateBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';


import myImage from "../imgs/LOGO.png";
import { useNavigate } from "react-router-dom";


function Login() {
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const [values, setValues] = useState({
    first_name: '',
    email: '',
    password: '',
    role: 'User',
    status: 'Active'
  })


  const handleRegister = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/registerUser', values)
      .then(res => {
        if (res.data.Status === "Success") {
          alert("Poprawnie zarejestrowano!");
          window.location.reload();
          navigate('/login');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/loginUser', values)
      .then(res => {
        console.log(res.data); // Log the response data
        if (res.data.Status === "Success") {
          console.log("Zalogowano pomyślnie!");
          navigate('/')
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log("err"));
  };


  return (
      <div className="logincontainer">
        <div className="login-form-box">
          <div className="Hype">
          </div>
          {hasAccount ? (
            <form>
              <h1>Log in to your account</h1>
              <div className="login-input-group">
                <div className="login-input-field">
                  <i>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </i>
                  <input type="email" placeholder="E-mail" onChange={e => setValues({ ...values, email: e.target.value })} required />
                </div>
                <div className="login-input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock} />
                  </i>
                  <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                </div>
                <p>
                  Forgot your Password? <a href="#"> <strong>Click here!</strong></a>
                </p>
              </div>
              <div className="login-btn-field">
                <button onClick={handleLogin}>Sign in</button>
              </div>
              <h1>Or continue with:</h1>
              <div className="social-field">
                <a>
                  <i>
                    <FontAwesomeIcon icon={faFacebook} />
                  </i>
                  <i>
                    <FontAwesomeIcon icon={faGoogle} />
                  </i>
                  <i>
                    <FontAwesomeIcon icon={faApple} />
                  </i>
                </a>
              </div>
              <div className="field1">
                <p>
                  New on HYPE?
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    {" "}
                    <strong>Create account</strong>
                  </span>
                </p>
              </div>
            </form>
          ) : (
            <form>
              <h1>Create account</h1>
              <div className="login-input-group">
                <div className="login-input-field">
                  <i>
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  <input type="text" placeholder="First name" onChange={e => setValues({ ...values, first_name: e.target.value })} required />
                </div>
                <div className="login-input-field">
                  <i>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </i>
                  <input type="email" placeholder="E-mail" onChange={e => setValues({ ...values, email: e.target.value })} required />
                </div>
                <div className="login-input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock} />
                  </i>
                  <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                </div>
              </div>
              <div className="btn-field1">
                <button onClick={handleRegister}>Sign up</button>
              </div>
              <div className="field1">
                <p>
                  Already a member?
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    {" "}
                    Log in
                  </span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
  );
}

export default Login;
