import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import './Exercises.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import {
    Link,
    useParams
} from "react-router-dom";
import Pagination from './Pagination';
import SearchBar from './SearchBar';





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
        <Container id='exercisesContainer'>
            <h3>{muscle_group}</h3>
            <Container id='exercisesContainer2'>
                <Pagination data={exercises} />
            </Container>
        </Container >
    );
}

export default AllExercises;
