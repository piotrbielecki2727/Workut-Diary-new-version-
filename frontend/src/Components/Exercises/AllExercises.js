import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import './Exercises.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import {
    useParams,
    useNavigate
} from "react-router-dom";
import Pagination from './Pagination';



function AllExercises() {
    const [exercises, setExercises] = useState([]);
    const { muscle_group } = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    const Exercises = "Exercises";



    useEffect(() => {
        if (muscle_group === "All exercises") {
            axios.get(`http://localhost:3001/getAllExercises`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        console.log(res.data.results);
                        setExercises(res.data.results);
                    }
                    else {
                        console.log("chujnia");
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            axios.get(`http://localhost:3001/getExerciseByMuscleGroup/${muscle_group}`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        console.log(res.data.results);
                        setExercises(res.data.results);
                    }
                    else {
                        console.log("chujnia");
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }, [muscle_group]);

    return (
        <div id='background'>
            <Container id='exercisesContainer'>
                <Container id='buttonContainer'>
                    <Button id="backButton" onClick={handleGoBack}>Back</Button>
                </Container>
                <h3>{muscle_group}</h3>
                <Container id='exercisesContainer2'>
                    <Pagination data={exercises} CurrentPagination={Exercises} />
                </Container>
            </Container >
        </div>
    );
}

export default AllExercises;
