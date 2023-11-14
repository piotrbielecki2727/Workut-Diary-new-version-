import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import {
    Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


import './PrintWorkoutHistory.css';





function PrintWorkoutHistory({ workouts }) {


    return (
        <>
            <h2 id='PrintWorkoutHistoryh2'>Workout history</h2>
            <Table responsive striped bordered id='PrintWorkoutHistoryTable'>
                <thead id='PrintWorkoutHistoryThead'>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                {workouts.map((workout, index) => (
                    <tbody id='PrintWorkoutHistoryTbody'>
                        <tr key={workout.id_done_training}>
                            <td>{workout.training_group_name}</td>
                            <td>{new Date(workout.date).toLocaleString()}</td>
                            <td><Button id='PrintWorkoutHistoryButton' as={Link} to={`/workoutPlanner/${workout.id_group}`}>
                                <FontAwesomeIcon icon={faEye} /> Check details
                            </Button></td>
                        </tr>
                    </tbody>
                ))}

            </Table>
        </>
    );
}

export default PrintWorkoutHistory;




