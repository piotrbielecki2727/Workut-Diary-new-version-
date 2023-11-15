import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';


import './WorkoutsHistory.css';
import FilterWorkoutHistory from './FilterWorkoutHistory';


function WorkoutsHistory() {


    return (
        <div id='background'>
            <Container id='WorkoutHistoryContainer'>
                <FilterWorkoutHistory />
            </Container>
        </div>
    );
}

export default WorkoutsHistory;




