import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './CreateWorkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

function EditWorkout({ workoutEdited, setWorkoutEdited, workoutName, workoutDate, workoutId }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [values, setValues] = useState({
        Name: '',
        Date: '',
        Users_id_user: sessionStorage.getItem('userId')
    })


    const editWorkout = () => {
        console.log(values);
        axios.put(`http://localhost:3001/editWorkout/${workoutId}`, values)
            .then(res => {
                if (res.data.Success) {
                    console.log("gicik")
                    setWorkoutEdited(true);
                }
                else {
                    console.log("err")
                }
            })
            .catch(err => {
                console.log("err")
            })
        setWorkoutEdited(false);

    }


    return (
        <>
            <Button variant="primary" onClick={handleShow} id="buttonWorkoutManager">
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header id='modalHeader' closeButton closeVariant='white'	>
                    <Modal.Title id='modalTitle' >Workout editor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group id='formGroup'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={workoutName} id='formControlModal' autoFocus required
                                onChange={e => setValues({ ...values, Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group id='formGroup'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="datetime-local" defaultValue={workoutDate} id='formControlModal' required
                                onChange={e => setValues({ ...values, Date: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer id='modalFooter'>
                    <Button id='modalButton' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /> Close</Button>
                    <Button id='modalButton' onClick={() => { editWorkout(); handleClose() }}><FontAwesomeIcon icon={faPenToSquare} /> Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default EditWorkout;
