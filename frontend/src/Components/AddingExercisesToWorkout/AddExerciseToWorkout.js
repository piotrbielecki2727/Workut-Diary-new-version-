import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useUserId } from '../UserIdContext';
import Table from 'react-bootstrap/Table';
import AddExercise from './AddExercise';



function AddExerciseToWorkout(ChoosedExerciseId) {


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setSelectedWorkout(null);
        setWorkoutId(null);
    };
    const handleShow = () => {
        setShow(true);
    }
    const { userId } = useUserId();
    const [workoutId, setWorkoutId] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [newExerciseAdded, setNewExerciseAdded] = useState(false);


    const handleSelectedOption = (event) => {
        const selectedWorkoutName = event.target.value;
        const selectedWorkout = workouts.find(workout => workout.Name === selectedWorkoutName);
        setSelectedWorkout(selectedWorkout);
        setWorkoutId(selectedWorkout.id_workout);
        setExercises([]);

    }


    useEffect(() => {
        console.log("dla usera: " + userId);
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result);
                    setWorkouts(res.data.result);
                }
                else {
                    console.error("Error getWorkoutExercises", res.data.Error);
                }

            })
            .catch(err => {
                console.log("err")

            })
    }, [userId])


    useEffect(() => {
        if (workoutId !== null) {
            console.log("dla workoutu: " + workoutId);
            axios.get(`http://localhost:3001/getWorkoutExercises/${workoutId}`)
                .then(res => {
                    if (res.data.Success) {
                        console.log(res.data.result);
                        setExercises(res.data.result);
                    }
                    else {
                        console.error("Error getWorkoutExercises", res.data.Error);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            setNewExerciseAdded(false);

        }
    }, [workoutId, newExerciseAdded]);



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
                    <h5>Choose the workout you want to add this exercise to:</h5>
                    <Form.Select onChange={handleSelectedOption} value={selectedWorkout ? selectedWorkout.Name : ''}>
                        <option value="" disabled>Select Workout</option>
                        {workouts.map(workout => (
                            <option key={workout.id_workout} value={workout.Name}>{workout.Name}</option>
                        ))}
                    </Form.Select>
                    {selectedWorkout ? (
                        <>
                            <h5>Chosen workout:</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr >
                                        <th><span>Name: </span></th>
                                        <th><span>Date: </span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={selectedWorkout.id_workout}>
                                        <td>{selectedWorkout.Name}</td>
                                        <td>{new Date(selectedWorkout.Date).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {exercises.length > 0 ? (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr >
                                            <th>Exercises</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exercises.map((exercise, index) => (
                                            <tr key={exercise.exercise_id}>
                                                <td >{index + 1}</td>
                                                <td >{exercise.Name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>) : (
                                <span>There are no exercises.</span>
                            )}
                        </>
                    ) : (
                        <></>

                    )}

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




