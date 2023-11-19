import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EditWorkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useUserId } from '../UserIdContext';
import Toasts from '../Toasts';

function EditWorkout({ setWorkoutEdited, workoutName, workoutId, setIsEditing }) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [toastType, setToastType] = useState(null);

    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: workoutName,
        Users_id_user: userId,
        workoutId: workoutId
    })

    const handleClose = () => setIsEditing(false);


    const handleError = () => alert("false");

    const handleClick = (id_group) => {
        setIsEditing(true);
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (values.Name.length === 0) {
            setShow(true);
            setMessage("Workout name can't be empty.");
            setToastType("warning");
            return;
        }

        else if (values.Name.length > 45) {
            setShow(true);
            setMessage("The length of the training name can't be longer than 45 characters.");
            setToastType("warning");
            return;
        }
        else {
            editWorkout();
        }
    }



    const editWorkout = () => {
        axios.put(`http://localhost:3001/editWorkout`, values)
            .then(res => {
                if (res.data.Success) {
                    setIsEditing(false);
                    setWorkoutEdited(true);
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
        setWorkoutEdited(false);

    }

    return (
        <Form onSubmit={handleSave}>
            <Toasts show={show} setShow={setShow} message={message} toastType={toastType} setToastType={setToastType} />
            <Form.Group id="editWorkoutForm">
                <Form.Control
                    required
                    id="formControlEditName"
                    type="text"
                    defaultValue={workoutName}
                    onChange={e => setValues({ ...values, Name: e.target.value })}
                ></Form.Control>
                <Button type='submit' id="ButtonWorkoutManager"><FontAwesomeIcon icon={faCheck} /></Button>
            </Form.Group>
        </Form>
    );

}

export default EditWorkout;