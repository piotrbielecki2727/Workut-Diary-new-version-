import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './CreateWorkout.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCalendarWeek, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useUserId } from '../UserIdContext';

function EditWorkout({ setWorkoutEdited, workoutName, workoutId, setIsEditing }) {


    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: workoutName,
        Date: '',
        Users_id_user: userId
    })



    const handleClick = (id_workout) => {
        setIsEditing(true);
    }

    const handleSave = () => {
        console.log(workoutId)
        editWorkout();
    }


    const editWorkout = () => {


        axios.put(`http://localhost:3001/editWorkout/${workoutId}`, values)
            .then(res => {
                if (res.data.Success) {
                    setIsEditing(false);
                    console.log("udaol sie")
                    setWorkoutEdited(true);
                }
                else {
                    alert("Nazwa treningu zbyt dluga!");
                    console.log("err")
                }
            })
            .catch(err => {
                console.log("err")
            })
        setWorkoutEdited(false);

    }

    return (

        <Form>
            <Form.Group id="editWorkoutForm">
                <Form.Control
                    required
                    id="formControlEditName"
                    type="text"
                    defaultValue={workoutName}
                    onChange={e => setValues({ ...values, Name: e.target.value })}
                ></Form.Control>
                <Button id="ButtonWorkoutManager" onClick={handleSave}><FontAwesomeIcon icon={faCheck} style={{ color: "#000000" }} /></Button>
            </Form.Group>
        </Form>
    );

}

export default EditWorkout;