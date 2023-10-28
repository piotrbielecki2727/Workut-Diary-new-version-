import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AddExercise from './AddExercise';

import GetWorkouts from './GetWorkouts';
import GetWorkoutExercises from './GetWorkoutExercises';



function AddExerciseToWorkout(ChoosedExerciseId) {

    const [selectedWorkout, setSelectedWorkout] = useState(false);
    const [workoutId, setWorkoutId] = useState(false);
    const [newExerciseAdded, setNewExerciseAdded] = useState(false);


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
                    <GetWorkoutExercises newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} workoutId={workoutId} setWorkoutId={setWorkoutId}/>
                </Modal.Body>
                <Modal.Footer id='modalFooter'>
                    <Button id='modalButton' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /> Close</Button>
                    <AddExercise newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} workoutId={workoutId} ChoosedExerciseId={ChoosedExerciseId.ChoosedExerciseId} />
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default AddExerciseToWorkout;




