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
            const fetchData = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=1000',
                    headers: {
                        'X-RapidAPI-Key': 'bca569beb6mshe6cf79cc749d63cp13c4dfjsn7c91553244a1',
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }

                };

                try {
                    const response = await axios.request(options);
                    setExercises(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchData(); 
        } else {
            const fetchData = async () => {
                const options = {
                    method: 'GET',
                    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle_group}?offset=0&limit=1000`,
                    headers: {
                        'X-RapidAPI-Key': 'bca569beb6mshe6cf79cc749d63cp13c4dfjsn7c91553244a1',
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    setExercises(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchData(); 
        }
    }, [muscle_group]);

    return (
        <Container id='exercisesContainer'>
            <SearchBar />
            <Container id='exercisesContainer2'>
                <Pagination data={exercises} />
            </Container>
        </Container >
    );
}

export default AllExercises;
