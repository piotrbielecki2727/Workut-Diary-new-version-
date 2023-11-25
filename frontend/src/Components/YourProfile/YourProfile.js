import React, { useState, useEffect } from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './YourProfile.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import body from "../imgs/body1.png";
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import InformationModal from './InformationModal';
import UserDetails from "./UserDetails";

import { useUserId } from '../UserIdContext';
import {
  useNavigate
} from "react-router-dom";

function YourProfile() {
  const { userId } = useUserId();
  const navigate = useNavigate();
  const [newMeasurement, setNewMeasurement] = useState(false);

  const [formData, setFormData] = useState({
    id_user: userId,
    neck: null,
    biceps: null,
    forearm: null,
    thigh: null,
    calf: null,
    weight: null,
    height: null,
    chest: null,
    waist: null,
    hips: null,
    date: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const saveMeasurements = (e) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(date.getHours() + 1);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const updatedFormData = {
      ...formData,
      date: formattedDate,
    };
    axios.post(`http://localhost:3001/saveMeasurements`, { formData: updatedFormData })
      .then(res => {
        if (res.data.Success) {
          console.log("success");
          setNewMeasurement(true);
        }
        else {
          console.log(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
      })
      setNewMeasurement(false);

  };

  useEffect(() => {
    if (userId === null) {
      navigate("/");
    }
    axios.get(`http://localhost:3001/getMeasurements/${userId}`)
      .then(res => {
        if (res.data.Success) {
          const measurementsArray = res.data.result;
          if (measurementsArray.length > 0) {
            const measurements = measurementsArray[0];
            setFormData(prevData => ({
              ...prevData,
              neck: measurements.neck,
              chest: measurements.chest,
              biceps: measurements.biceps,
              waist: measurements.waist,
              forearm: measurements.forearm,
              thigh: measurements.thigh,
              calf: measurements.calf,
              hips: measurements.hips,
              weight: measurements.hips,
              height: measurements.hips,
              date: measurements.date,
            }));
          } else {
            
          }
        } else {
          console.log(res.data.Error);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [userId]);





  return (
    <div id='background'>
      <Container className="YourProfileContainer" >
        <CardGroup className='CardGroupUserDetails'>
          <UserDetails userId={userId} setNewMeasurement={setNewMeasurement} newMeasurement={newMeasurement} />
          <Card className='BodyDetails'>
            <Card.Header>
              Body measurements
            </Card.Header>
            <Form onSubmit={saveMeasurements}>
              <Card.Body>
                <Row>
                  <Col xs={4}>

                    <Form.Group as={Row} className='customMarginNeck'>
                      <Form.Label column xs={6}>
                        Neck
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="neck"
                          value={formData.neck}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>



                    <Form.Group as={Row} className='customMarginBiceps'>
                      <Form.Label column xs={6}>
                        Biceps
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="biceps"
                          value={formData.biceps}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginForearm'>
                      <Form.Label column xs={6}>
                        Forearm
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="forearm"
                          value={formData.forearm}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginThigh'>
                      <Form.Label column xs={6}>
                        Thigh
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="thigh"
                          value={formData.thigh}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginCalf'>
                      <Form.Label column xs={6}>
                        Calf
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="calf"
                          value={formData.calf}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginWeight'>
                      <Form.Label column xs={6}>
                        Weight
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Image className='imageBody' src={body} fluid />
                  </Col>
                  <Col xs={4}>
                    <InformationModal />
                    <Form.Group as={Row} className='customMarginChest'>
                      <Form.Label column xs={6}>
                        Chest
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="chest"
                          value={formData.chest}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginWaist'>
                      <Form.Label column xs={6}>
                        Waist
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="waist"
                          value={formData.waist}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginHips'>
                      <Form.Label column xs={6}>
                        Hips
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="hips"
                          value={formData.hips}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='customMarginHeight'>
                      <Form.Label column xs={6}>
                        Height
                      </Form.Label>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                </Row>

              </Card.Body>
              <Card.Footer className="footer"><Button type="submit" variant="none" className="SaveButton">Save</Button></Card.Footer>
            </Form>
          </Card>

        </CardGroup>
      </Container>
    </div >
  );
}

export default YourProfile;
