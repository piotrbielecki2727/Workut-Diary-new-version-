import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faPersonDress, faCalendar, faWeightScale, faRulerVertical, faStopwatch20, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';

import Container from 'react-bootstrap/Container';
import './BmrCalculator.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function BmrCalculator() {

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedInput, setSelectedInput] = useState(null);


  const handleButtonClick = (gender) => {
    setSelectedGender(gender);
  }

  const handleInputChange = (input) => {
    setSelectedInput(input);
  }

  const handleInputBlur = () => {
    setSelectedInput(null);
  }

  return (
    <div id='background'>
      <Container className="BMRContainer" >
        <h3 className="h3">Calculate your caloric needs</h3>
        <Form>

          <Row className="genderRow">
            <Col lg={2}>Gender: </Col>
            <Col lg={2}>
              <Button
                className={`genderButton ${selectedGender === 'male' ? 'active' : ''}`}
                onClick={() => handleButtonClick('male')}
                variant="none"
              >
                <FontAwesomeIcon icon={faPerson} /> Male
              </Button>
            </Col>
            <Col lg={2}>
              <Button
                className={`genderButton ${selectedGender === 'female' ? 'active' : ''}`}
                onClick={() => handleButtonClick('female')}
                variant="none"
              >
                <FontAwesomeIcon icon={faPersonDress} /> Female
              </Button>
            </Col>
          </Row>

          <Row className="MeasurementsRow">
            <Col lg={2}>
              <Form.Label>
                <div className={`measurementIconActive ${selectedInput === 'age' ? 'active' : ''}`}
                ><FontAwesomeIcon icon={faCalendar} /> Age:</div>              </Form.Label>
              <Form.Control
                className="MeasurementInput"
                onClick={() => handleInputChange('age')}
                onBlur={handleInputBlur}
                type="number"
                required
                min={1}
              >

              </Form.Control>
            </Col>

            <Col lg={2}>
              <Form.Label>
                <div className={`measurementIconActive ${selectedInput === 'weight' ? 'active' : ''}`}
                ><FontAwesomeIcon icon={faWeightScale} /> Weight:</div>
              </Form.Label>
              <Form.Control
                className="MeasurementInput"
                onClick={() => handleInputChange('weight')}
                onBlur={handleInputBlur}
                type="number"
                required
                min={1}
              >
              </Form.Control>
            </Col>

            <Col lg={2}>
              <Form.Label>
                <div className={`measurementIconActive ${selectedInput === 'height' ? 'active' : ''}`}
                ><FontAwesomeIcon icon={faRulerVertical} /> Height:</div>

              </Form.Label>
              <Form.Control
                className="MeasurementInput"
                onClick={() => handleInputChange('height')}
                onBlur={handleInputBlur}
                type="number"
                required
                min={1}
              >
              </Form.Control>
            </Col>
          </Row>

          <Row className="activityRow">
            <Col lg={6}>
              <Dropdown className="DropDownActivity">
                <Dropdown.Toggle className="DropDownToggleActivity" >
                  <FontAwesomeIcon icon={faStopwatch20} /> Activity level
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >1. Sedentary: If you get minimal or no exercise.</Dropdown.Item>
                  <Dropdown.Item >2. Lightly active: If you exercise lightly one to three days a week.</Dropdown.Item>
                  <Dropdown.Item >3. Moderately active: If you exercise moderately three to five days a week.</Dropdown.Item>
                  <Dropdown.Item >4. Very active: If you engage in hard exercise six to seven days a week.</Dropdown.Item>
                  <Dropdown.Item >5. Extra active: If you engage in very hard exercise six to seven days a week or have a physical job.</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

        </Form>

      </Container>

    </div>
  );
}

export default BmrCalculator;




