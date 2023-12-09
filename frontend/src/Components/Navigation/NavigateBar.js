import "./NavigateBar.css";
import logo from "../imgs/LOGO.png";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faDumbbell, faUser, faUsers, faListCheck, faPhone, faCalculator, faBars, faCircleInfo, faSignOutAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useUserId } from '../UserIdContext';
import { useAuth } from "../AuthContext";
import { useRole } from "../RoleContext";


function NavigateBar() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const { userId, setUserId } = useUserId();
  const { auth, setAuth } = useAuth();
  const { role, setRole } = useRole();

  axios.defaults.withCredentials = true;

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        if (res.data.Status === "Success") {
          setRole(res.data.role);
          setAuth(true);
          setName(res.data.firstName);
          setUserId(res.data.idUser);
        }

        else {
          setAuth(false);
          setMessage(res.data.Error);
          setRole("Guest");
        }
      })
      .catch(err => console.log(err))
  }, [navigate, userId, role]);



  const handleDelete = () => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        handleCloseOffcanvas();
        window.location.reload();
        navigate('/')

      }).catch(err => console.log(err));
  }

  return (
    <Navbar expand="xxl" className="bg-body-tertiary mb-0" sticky="top" id="navbar" >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" >
            <Image src={logo} alt="Logo" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => { setShowOffcanvas(true) }} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
        >
          <Offcanvas.Header closeButton closeVariant="white" id="offcanvasHeader">
            {auth ? (<Offcanvas.Title className="offcanvasNavbarLabel">
              {"Welcome, " + name}
            </Offcanvas.Title>) : ((<Offcanvas.Title className="offcanvasNavbarLabel">
              Menu      </Offcanvas.Title>))}
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <hr className="my-1" />
              {role === "Admin" ? (
                <>
                  <div className="navDiv">
                    <Link to={"/manageUsers"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faUsers} className="custom-icon" /></i>User management</Link>
                  </div>
                  <div className="navDiv">
                    <Link to="/messages" className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faEnvelope} className="custom-icon" /></i>User messages</Link>
                  </div>
                  <div className="navDiv">
                    <Link to="/manageExercises" className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faListCheck} className="custom-icon" /></i>Exercise management</Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="navDiv">
                    <Link to={"/introduction"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faCircleInfo} className="custom-icon" /></i>Introduction</Link>
                  </div>
                  <div className="navDiv">
                    <Link to={"/BmrCalculator"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faCalculator} className="custom-icon" /></i>Calculate your BMR</Link>
                  </div>
                  {role === "User" && (
                    <div className="navDiv">
                      <Link to="/contact" className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faEnvelope} className="custom-icon" /></i>Contact us</Link>
                    </div>
                  )}
                </>
              )}
              <div className="navDiv">
                <Link to="/exercises" className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faDumbbell} className="custom-icon" /></i>Exercises</Link>
              </div>


              <hr className="my-1" />
            </Nav>
            <Nav className="ms-auto me-3">
              {auth && role === "User" ? (
                <>
                  <div className="navDiv">
                    <NavDropdown title={
                      <>
                        <i className="iForNavigation"><FontAwesomeIcon icon={faBars} className="custom-icon" /></i>
                        Workout manager
                      </>
                    } id="offcanvasNavbarDropdown" >
                      <NavDropdown.Item as={Link} to="/workoutManager" onClick={handleCloseOffcanvas}>Manage your workouts</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/progress" onClick={handleCloseOffcanvas}>Check your progress</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/WorkoutsHistory" onClick={handleCloseOffcanvas}>Workouts history</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <hr className="my-1" />
                  <div className="navDiv">
                    <Link to={"/yourProfile"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faUser} className="custom-icon" /></i>Your profile</Link></div>
                  <hr className="my-1" />
                </>
              ) : (
                <>
                </>
              )}
              {auth ? (
                <>
                  <div id="navDivLogoutButton">
                    <Button id="logoutButton" onClick={handleDelete}> <i><FontAwesomeIcon icon={faSignOutAlt} className="custom-icon" /></i> Log out</Button>
                  </div>
                </>
              ) : (
                <>
                  < Link to="/login" className='get-started-link' onClick={handleCloseOffcanvas}>Sign in!</Link>
                </>)}

            </Nav>
          </Offcanvas.Body>

        </Navbar.Offcanvas>

      </Container >
    </Navbar >
  );
}

export default NavigateBar;
