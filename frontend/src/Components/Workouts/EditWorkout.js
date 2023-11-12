import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './EditWorkout.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useUserId } from '../UserIdContext';

function EditWorkout({ setWorkoutEdited, workoutName, workoutId, setIsEditing }) {


    const { userId } = useUserId();

    const [values, setValues] = useState({
        Name: workoutName,
        Users_id_user: userId
    })

    const handleClose = () => setIsEditing(false);


    const handleClick = (id_group) => {
        setIsEditing(true);
    }

    const handleSave = () => {
        if (values.Name.length === 0) {
            alert("nazwa nie moze byc 0");
            return
        }
        else {
            editWorkout();
        }

    }


    const editWorkout = () => {
        console.log(workoutId);
        console.log(values);
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

                <Button id="ButtonWorkoutManager" onClick={handleSave}><FontAwesomeIcon icon={faCheck} /></Button>

            </Form.Group>
        </Form>
    );

}

export default EditWorkout;