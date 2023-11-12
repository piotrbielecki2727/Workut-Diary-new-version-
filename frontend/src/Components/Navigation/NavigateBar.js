import "./NavigateBar.css";
import logo from "../imgs/LOGO.png";
import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faDumbbell, faUser, faPhone, faCalculator, faBars, faCalendar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useUserId } from '../UserIdContext';
import { useAuth } from "../AuthContext";



function NavigateBar() {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const { userId, setUserId } = useUserId();
  const {auth, setAuth} = useAuth();


  axios.defaults.withCredentials = true;

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.firstName);
          setUserId(res.data.idUser);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [navigate, userId]);



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
          <Link to="/" className="logo">
            <Image src={logo} alt="Logo" style={{ width: "175px" }} />
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
              <div className="navDiv">
                <Link to="/exercises" className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faDumbbell} className="custom-icon" /></i>Exercises</Link></div>
              <div className="navDiv">
                <Link to={"/coachSection"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faCalendar} className="custom-icon" /></i>Workout plans</Link></div>
              <div className="navDiv">
                <Link to={"/bmiCalculator"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faCalculator} className="custom-icon" /></i>Calculate your BMI</Link></div>
              <div className="navDiv">
                <Link to={"/contact"} className='nav-link' onClick={handleCloseOffcanvas}><i className="iForNavigation"><FontAwesomeIcon icon={faPhone} className="custom-icon" /></i>Contact </Link></div>
              <hr className="my-1" />
            </Nav>
            <Nav className="ms-auto me-3">
              {auth ? (
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
                      <NavDropdown.Item as={Link} to="/WorkoutsHistory" onClick={handleCloseOffcanvas}>Workouts base</NavDropdown.Item>
                    </NavDropdown>
                  </div>
                  <hr className="my-1" /> {/* Linia oddzielająca */}
                  <div className="navDiv">
                    <NavDropdown title={
                      <>
                        <i className="iForNavigation"><FontAwesomeIcon icon={faUser} className="custom-icon" /></i>
                        Your profile
                      </>
                    } id="offcanvasNavbarDropdown" >
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                  </div>
                  <hr className="my-1" />
                  <div id="navDivLogoutButton">
                    <Button id="logoutButton" onClick={handleDelete}> <i><FontAwesomeIcon icon={faSignOutAlt} className="custom-icon" /></i> Log out</Button>
                  </div>

                </>) : (
                <Link to="/login" className='get-started-link' onClick={handleCloseOffcanvas}>Sign in!</Link>
              )
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container >
    </Navbar >
  );
}

export default NavigateBar;