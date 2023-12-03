import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../AuthContext';
import AddExerciseToWorkout from '../AddingExercisesToWorkout/AddExerciseToWorkout';




import './ChoosedExercise.css';
import axios from 'axios';

import {
    useParams,
    Link,
    useNavigate
} from "react-router-dom";
import OtherExercisesCarousel from './OtherExercisesCarousel';

function ChoosedExercise() {
    const [exercise, setExercise] = useState([]);
    const navigate = useNavigate();
    const { Name } = useParams();
    const { auth } = useAuth();
    const { main_muscle_group } = useParams();

    const handleGoBack = () => {
        navigate(-1);
    }



    useEffect(() => {
        axios.get(`http://localhost:3001/getChoosedExercise/${Name}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.results);
                    setExercise(res.data.results[0]);
                }
                else {
                    console.error(res.data.Error);
                }

            })
            .catch(err => console.log(err));

    }, [Name]);


    return (
        <div id='background'>
            <Container id='choosedExerciseContainer'>
                <Container id='buttonContainer'>
                    <Button id="backButton" onClick={handleGoBack}>Back</Button>
                </Container>
                <h2>{exercise.Name}</h2>
                <Container id='choosedExerciseContainer2'>
                    <Image src={exercise.gif} alt="exercise_gif" id='exerciseImg' />
                    <Table bordered hover responsive>
                        <thead>
                            <tr id='theadExercises'>
                                <th>Primary muscles</th>
                                <th>Minor muscles</th>
                                <th>Difficulty</th>
                                <th>Equipment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{exercise.main_muscle_group}</td>
                                <td>{exercise.muscle_group_1}<br></br> {exercise.muscle_group_2}</td>
                                <td>{exercise.difficulty}</td>
                                <td>{exercise.equipment ? exercise.equipment : "---"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {auth ? (
                        <AddExerciseToWorkout ChoosedExerciseId={exercise.id_exercise} />
                    ) : (
                        <></>
                    )}
                    <hr></hr>
                    <h3>Instructions</h3>
                    {exercise && exercise.description &&
                        <ul className='Instructions' >

                            {
                                exercise.description.split('\n').map((point, index) => (
                                    <p id='h4Exercises' key={index}>{point}</p>
                                ))
                            }
                        </ul>
                    }
                    <hr></hr>
                    <h3>Video tutorial</h3>
                    <iframe
                        className='iFrame'
                        src={exercise.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    <hr></hr>
                    <h3>Other exercises for {main_muscle_group}</h3>
                    <OtherExercisesCarousel main_muscle_group={main_muscle_group} />


                </Container >
            </Container >
        </div>
    );
}

export default ChoosedExercise;
