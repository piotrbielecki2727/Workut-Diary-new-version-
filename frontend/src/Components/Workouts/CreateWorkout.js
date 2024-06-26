import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import './CreateWorkout.css';
import axios from 'axios';
import { useUserId } from '../UserIdContext';
import Toasts from "../Toasts";


function CreateWorkout({ newWorkoutAdded, setNewWorkoutAdded, setIsCreating }) {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [toastType, setToastType] = useState(null);


    const handleClose = () => setIsCreating(false);
    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: '',
        Users_id_user: userId
    })


    const createWorkout = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/createWorkout", values)
            .then(res => {
                if (res.data.Success) {
                    setNewWorkoutAdded(true);
                    setIsCreating(false);
                    handleClose();
                }
                else {
                    setShow(true);
                    setMessage(res.data.Error);
                    setToastType("warning");
                }
            })
            .catch(err => {
                setShow(true);
                setMessage(err);
                setToastType("warning");
            })
    }


    return (
        <Form onSubmit={createWorkout}>
            <Toasts show={show} setShow={setShow} message={message} toastType={toastType} setToastType={setToastType} />
            <Form.Group id="createWorkoutForm">
                <Form.Control
                    required
                    id="formControlCreateWorkout"
                    type="text"
                    onChange={e => setValues({ ...values, Name: e.target.value })}
                    minLength={1}
                ></Form.Control>
                <Button id="ButtonWorkoutManager" type='submit'><FontAwesomeIcon icon={faPlus} /></Button>
                <Button id="ButtonWorkoutManager" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></Button>
            </Form.Group>
        </Form>
    );

}

export default CreateWorkout;
