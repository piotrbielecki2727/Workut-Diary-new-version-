import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import './Exercises.css';
import axios from 'axios';

import {
    useParams
} from "react-router-dom";





function ChoosedExercise() {
    const [exercise, setExercise] = useState([]);

    const { id_exercise } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3001/getChoosedExercise/${id_exercise}`)
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

    }, []);

    return (
        <Container id='exercisesContainer'>
            {exercise.Name}
            <iframe width="400" height="400" src={exercise.video} frameborder="0" allowfullscreen></iframe>
            <img src={exercise.gif}></img>
            {exercise.description}
            {exercise.equipment}
            {exercise.difficulty}
            {exercise.main_muscle_group}
            {exercise.muscle_group_1}
            {exercise.muscle_group_2}

        </Container >
    );
}

export default ChoosedExercise;
