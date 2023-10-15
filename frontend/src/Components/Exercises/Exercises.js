import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import './Exercises.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Link,
    useNavigate,
    useParams
} from "react-router-dom";





function Exercises() {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [name, setName] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:3001/getMuscleGroups')
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.results);
                    setMuscleGroups(res.data.results);

                }
                else {
                    console.error(res.data.Error);
                }

            })
            .catch(err => console.log(err));

    },);

    return (
        <div id="background">
            <Container id='exercisesContainer'>
                <h3>Find your exercise</h3>
                <Form.Control id='searchBar' type="text" placeholder="Name..." />
                <h3>or choose muscle group you want to train</h3>
                <Row className='customRow'>
                    {muscleGroups.map(muscleGroup => (
                        <Col key={muscleGroup.id} xs={5} sm={6} md={4} lg={3}>
                            <Link to={`/getExercises/${muscleGroup.muscle_group}`} id='muscle-group-link'><Card className='customCard'>
                                <Card.Img src={require(`${muscleGroup.img_src}`)} alt="horse" />
                                <Card.Footer className='customCardFooter'>
                                    {muscleGroup.muscle_group}
                                </Card.Footer>
                            </Card>
                            </Link>
                        </Col>
                    ))}

                </Row>
            </Container >
        </div>
    );
}

export default Exercises;
