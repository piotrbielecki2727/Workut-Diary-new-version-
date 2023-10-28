import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './CreateWorkout.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useUserId } from '../UserIdContext';


function CreateWorkout({ newWorkoutAdded, setNewWorkoutAdded }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: '',
        Date: '',
        Users_id_user: userId
    })


    const createWorkout = () => {
        const workoutData = {
            Name: values.Name,
            Date: values.Date,
            Users_id_user: userId
        };
        console.log(workoutData);
        axios.post("http://localhost:3001/createWorkout", workoutData)
            .then(res => {
                if (res.data.Success) {
                    setNewWorkoutAdded(true);
                    handleClose();
                }
                else {
                    console.log("err")
                }
            })
            .catch(err => {
                console.log("err")
            })
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow} id='createModalButton'>
                Create new workout
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header id='modalHeader' closeButton closeVariant='white'	>
                    <Modal.Title id='modalTitle' >Workout creator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group id='formGroup'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="email" placeholder="Enter name..." id='formControlModal' autoFocus required
                                onChange={e => setValues({ ...values, Name: e.target.value })} />
                        </Form.Group>
                        <Form.Group id='formGroup'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="datetime-local" id='formControlModal' required
                                onChange={e => setValues({ ...values, Date: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer id='modalFooter'>
                    <Button id='modalButton' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /> Close</Button>
                    <Button id='modalButton' onClick={createWorkout}><FontAwesomeIcon icon={faPlus} /> Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default CreateWorkout;
