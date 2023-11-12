import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import './CreateWorkout.css';
import axios from 'axios';
import { useUserId } from '../UserIdContext';


function CreateWorkout({ newWorkoutAdded, setNewWorkoutAdded, setIsCreating }) {

    const handleClose = () => setIsCreating(false);
    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: '',
        Date: null,
        Users_id_user: userId
    })

    const handleSave = () => {
        if (values.Name.length === 0) {
            alert("nazwa nie moze byc 0");
            return
        }
        else {
            createWorkout();
        }
    }

    const createWorkout = () => {

        axios.post("http://localhost:3001/createWorkout", values)
            .then(res => {
                if (res.data.Success) {
                    setNewWorkoutAdded(true);
                    setIsCreating(false);
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
        <Form>
            <Form.Group id="createWorkoutForm">
                <Form.Control
                    required
                    id="formControlCreateWorkout"
                    type="text"
                    onChange={e => setValues({ ...values, Name: e.target.value })}
                    minLength={1}
                ></Form.Control>
                <Button id="ButtonWorkoutManager" onClick={handleSave}><FontAwesomeIcon icon={faPlus} /></Button>
                <Button id="ButtonWorkoutManager" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></Button>
            </Form.Group>
        </Form>
    );

}

export default CreateWorkout;
