import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './StartWorkout.css';


import Pagination from '../Exercises/Pagination';

function SetsRepsWeight({ exercises, workoutId, workoutName, workoutDate }) {

  const [show, setShow] = useState(false);
  const [exercise, setExercise] = useState([]);
  const StartWorkout = true;



  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true);
    console.log(workoutDate)
    console.log(workoutName)
  }

  return (
    <>
      <Button onClick={handleShow} id='startWorkoutButton'>
        Start workout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'

      >
        <Modal.Header id='startWorkoutModalHeader' closeButton closeVariant='white'	>
        </Modal.Header>
        <Modal.Body>
          <Pagination data={exercises} StartWorkout={StartWorkout} workoutName={workoutName} workoutDate={workoutDate} workoutId={workoutId} />
        </Modal.Body>
      </Modal >
    </>
  )
}

export default SetsRepsWeight;



