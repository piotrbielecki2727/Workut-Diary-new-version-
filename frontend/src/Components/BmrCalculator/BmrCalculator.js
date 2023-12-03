import React from "react";
import Container from 'react-bootstrap/Container';
import './BmrCalculator.css';
import BMRForm from "./BMRForm";


function BmrCalculator() {

  return (
    <div id='background'>
      <Container className="BMRContainer" >
        <BMRForm />
      </Container>

    </div >
  );
}

export default BmrCalculator;




