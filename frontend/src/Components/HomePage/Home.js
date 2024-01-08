import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Home.css';
import logo from "../imgs/LOGO.png";
import desktop from "../imgs/DESKTOP.png";
import mobile from "../imgs/PORTRAIT.png";

function Home() {
  return (
    <div id="background">
      <Container className="homeContainer">
        <Row>
          <Col lg={12}>
            <h1>HYPE</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <h2>Change Your Life, Start Now!</h2>
            <p>Achieve your fitness goals with our app. Register your workouts, track your progress, and stay up-to-date with your results!</p>
            <h2>Your Fitness Goals at Your Fingertips!</h2>
            <p>Browse, edit, and delete workouts, record measurements, and track your progress. With us, every workout is a step towards a better you!</p>
          </Col>
        </Row>
        <Row>
          <Col lg={8} xs={12}>
            <Image className="image1" src={desktop} />
          </Col>
          <Col lg={4} xs={12}>
            <Image className="image" src={mobile} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
