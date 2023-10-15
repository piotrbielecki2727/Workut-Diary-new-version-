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





function AllExercises() {
    const [exercises, setExercises] = useState([]);
    const { muscle_group } = useParams();



    useEffect(() => {
        if (muscle_group === "All exercises") {
            axios.get(`http://localhost:3001/getAllExercises`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        console.log(res.data.results);
                        setExercises(res.data.results);
                    }
                    else {
                        console.error(res.data.Error);
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log(muscle_group);
            axios.get(`http://localhost:3001/getExerciseByMuscleGroup/${muscle_group}`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        console.log(res.data.results);
                        setExercises(res.data.results);
                    }
                    else {
                        console.error(res.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [muscle_group]);

    return (
        <Container id='exercisesContainer'>
            <h3>Find your exercise</h3>
            <Form.Control id='searchBar' type="text" placeholder="Name..." />
            <Row className='customRow'>
                {exercises.map(exercise => (
                    <Col key={exercise.id_exercise} xs={5} sm={6} md={4} lg={3}>
                        <Link to={`/getExercise/${exercise.id_exercise}`} id='muscle-group-link'><Card className='customCard'>
                            <Card.Img src={exercise.gif} alt="chuj" />
                            <Card.Footer className='customCardFooter'>
                                {exercise.Name}
                            </Card.Footer>
                        </Card>
                        </Link>
                    </Col>
                ))}

            </Row>
        </Container >
    );
}

export default AllExercises;
