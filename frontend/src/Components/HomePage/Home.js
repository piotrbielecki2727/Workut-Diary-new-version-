
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './Home.css';
import logo from "../imgs/LOGO.png";
import desktop from "../imgs/DESKTOP.png";
import mobile from "../imgs/MOBILE.png";


function Home() {

  return (

    <div id="background">

      <Container className="homeContainer">
        <Row>
         
          <Col className="laptopCol" lg={8}>        <Image className="image1" src={desktop}  />
          </Col>
          <Col className="mobileCol" lg={4}>        <Image className="image" src={mobile}  />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home;
