import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './DeleteWorkout.css';

function DeleteWorkout({ workoutId, workoutDeleted, setWorkoutDeleted }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const handleDelete = () => {
        axios.get(`http://localhost:3001/checkIfWorkoutIsEmpty/${workoutId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log("empty")
                    deleteWorkout();
                }
                else {
                    handleShow();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteWorkout = () => {
        axios.get(`http://localhost:3001/checkIfWorkoutIsEmpty/${workoutId}`)
            .then(res => {
                if (res.data.Success) {
                    axios.delete(`http://localhost:3001/deleteWorkout/${workoutId}`)
                        .then(res => {
                            if (res.data.Success) {
                                setWorkoutDeleted(true);
                            }
                            else {
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    setWorkoutDeleted(false);
                }
                else {
                    axios.delete(`http://localhost:3001/deleteWholeWorkout/${workoutId}`)
                        .then(res => {
                            if (res.data.Success) {
                                setWorkoutDeleted(true);
                            }
                            else {
                                console.log(res.data.Error);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    setWorkoutDeleted(false);

                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    


    return (
        <>
            <Button className="buttonX" variant='none' onClick={handleDelete}><FontAwesomeIcon icon={faXmark} /></Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='modalHeader' closeVariant='white'>
                    <Modal.Title>Deleting workout</Modal.Title>
                </Modal.Header>
                <Modal.Body><p className='areYouSure'>Are you sure you want to delete this workout? Deleting the workout will also remove 
                all associated completed workouts. Confirm?</p></Modal.Body>
                <Modal.Footer>
                    <Button className="buttonClose" variant='dark' onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="buttonDelete" variant='danger' onClick={deleteWorkout}>
                        Delete workout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
export default DeleteWorkout;
