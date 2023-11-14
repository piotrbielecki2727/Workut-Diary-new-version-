import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUserId } from '../UserIdContext';
import PrintWorkoutHistory from './PrintWorkoutHistory';

import './WorkoutsHistory.css';





function WorkoutsHistory() {


    const { userId } = useUserId();
    const [workouts, setWorkouts] = useState([]);



    useEffect(() => {
        axios.get(`http://localhost:3001/getUserDoneWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result)
                    setWorkouts(res.data.result)
                }
                else
                    console.log("error")
            })
            .catch(err => {
                console.log(err)
            })
    }, [userId]);




    return (
        <div id='background'>
            <Container id='WorkoutHistoryContainer'>
                <PrintWorkoutHistory workouts={workouts}/>
            </Container>
        </div>
    );
}

export default WorkoutsHistory;




