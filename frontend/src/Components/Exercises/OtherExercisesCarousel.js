import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import './OtherExercisesCarousel.css';
import {
    Link
} from "react-router-dom";




function OtherExercisesCarousel({ main_muscle_group }) {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/otherExercisesCarousel/${main_muscle_group}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log("xdd", res.data.results);
                    setExercises(res.data.results);
                } else {
                    console.log(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            })

    }, [main_muscle_group])




    return (
        <Container id='carouselContainer'>
            <Carousel data-bs-theme="dark">
                {exercises.map(exercise => (
                    <Carousel.Item key={exercise.id_exercise}>
                        <Link to={`/getExercise/${main_muscle_group}/${exercise.Name}`}>
                            <Image src={exercise.gif} fluid />
                            <Carousel.Caption>
                                <h3 id="carouselCaption">{exercise.Name}</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default OtherExercisesCarousel;








