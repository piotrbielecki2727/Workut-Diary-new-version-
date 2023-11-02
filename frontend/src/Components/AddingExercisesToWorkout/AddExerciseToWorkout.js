import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddExercise from './AddExercise';
import GetWorkoutExercises from './GetWorkoutExercises';
import {
    Link
} from "react-router-dom";
import './AddExerciseToWorkout.css';



function AddExerciseToWorkout(ChoosedExerciseId) {

    const [selectedWorkout, setSelectedWorkout] = useState(false);
    const [workoutId, setWorkoutId] = useState(false);
    const [newExerciseAdded, setNewExerciseAdded] = useState(false);
    const [workouts, setWorkouts] = useState(false);



    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setSelectedWorkout(null);
        setWorkoutId(null);
    };
    const handleShow = () => {
        setShow(true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} id='createModalButton'>
                Add to workout
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header id='modalHeader' closeButton closeVariant='white'	>
                    <Modal.Title id='modalTitle'>Choose workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GetWorkoutExercises selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} workoutId={workoutId} setWorkoutId={setWorkoutId} workouts={workouts} setWorkouts={setWorkouts} />
                </Modal.Body>
                <Modal.Footer id='AddExerciseToWorkoutmodalFooter'>
                    <Button id='AddExerciseToWorkoutmodalButton' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /> Close</Button>
                    {selectedWorkout ? (
                        <Button id="AddExerciseToWorkoutmodalButton" as={Link} to={`/workoutPlanner/${workoutId}`}><FontAwesomeIcon icon={faArrowRight} /> Check this workout</Button>

                    ) : (
                        <></>
                    )}
                    {workouts.length > 0 ? (

                        <AddExercise newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} workoutId={workoutId} ChoosedExerciseId={ChoosedExerciseId.ChoosedExerciseId} />

                    ) : (
                        <>
                        </>)
                    }

                </Modal.Footer>
            </Modal >
        </>
    )
}

export default AddExerciseToWorkout;




