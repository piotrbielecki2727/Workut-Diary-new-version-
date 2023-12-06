import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Toasts from "../Toasts";

import { useNavigate } from "react-router-dom";


function Login() {
  axios.defaults.withCredentials = true;
  const [hasAccount, setHasAccount] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [values, setValues] = useState({
    first_name: '',
    email: '',
    password: '',
    role: 'User',
    status: 'Active',
    last_logged_in: getDefaultDateTime()
  })

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState(null);

  const navigate = useNavigate();

  function getDefaultDateTime() {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const handleChangeLastLoggedIn = () => {
    axios.post('http://localhost:3001/updateHour', values)
      .then(res => {
        if (res.data.Status === "Success") {
          console.log(res.data.Success, "dzialam");
        } else {
          console.log(res.data.Error, "wyjebalo");
        }
      })
      .catch(err => console.log(err));
  }


  const handleRegister = (event) => {
    event.preventDefault();
    if (!values.email || !values.password || !values.first_name) {
      setShow(true);
      setMessage("Please fill in all required fields.");
      setToastType("warning");
    }
    else if (!emailRegex.test(values.email)) {
      setShow(true);
      setMessage("Missing @ in the email address.");
      setToastType("warning");
    }
    else {
      axios.post('http://localhost:3001/registerUser', values)
        .then(res => {
          if (res.data.Status === "Success") {
            window.location.reload();
            navigate('/login');
          } else {
            setShow(true);
            setMessage(res.data.Error);
            setToastType("error");
          }
        })
        .catch(err => console.log(err));
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      setShow(true);
      setMessage("Please fill in all required fields.");
      setToastType("warning");
    }
    else if (!emailRegex.test(values.email)) {
      setShow(true);
      setMessage("Missing @ in the email address.");
      setToastType("warning");
    }

    else {
      axios.post('http://localhost:3001/loginUser', values)
        .then(res => {
          if (res.data.Status === "Success") {
            handleChangeLastLoggedIn();
            navigate('/')
            window.location.reload();
          } else {
            setShow(true);
            setMessage(res.data.Error);
            setToastType("error");
          }
        })
        .catch(err => console.log("err"));
    }
  };


  return (
    <div className="logincontainer">
      <Toasts show={show} setShow={setShow} message={message} toastType={toastType} setToastType={setToastType} />
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
