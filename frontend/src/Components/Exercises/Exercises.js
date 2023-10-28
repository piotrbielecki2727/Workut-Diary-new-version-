import './Exercises.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import {
    Link,
} from "react-router-dom";





function Exercises() {
    const [muscleGroups, setMuscleGroups] = useState([]);



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

    }, []);

    return (
            <Container id='exercisesContainer'>
                <SearchBar />
                <h3>or choose muscle group you want to train</h3>
                <Row className='customRow'>
                    {muscleGroups.map(muscleGroup => (
                        <Col key={muscleGroup.id} xs={5} sm={6} md={4} lg={3}>
                            <Link to={`/getExercises/${muscleGroup.muscle_group}`} id='muscle-group-link'><Card className='customCard'>
                                <Card.Img src={require(`${muscleGroup.img_src}`)} alt="exercise_gif" />
                                <Card.Footer className='customCardFooter'>
                                    {muscleGroup.muscle_group}
                                </Card.Footer>
                            </Card>
                            </Link>
                        </Col>
                    ))}

                </Row>
            </Container >
    );
}

export default Exercises;
