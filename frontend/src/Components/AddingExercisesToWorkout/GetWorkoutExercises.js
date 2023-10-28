import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import GetWorkouts from './GetWorkouts';
import './GetWorkoutExercises.css';
import DeleteExerciseFromWorkout from './DeleteExerciseFromWorkout'



function GetWorkoutExercises({ newExerciseAdded, setNewExerciseAdded, workoutId, setWorkoutId, workouts, setWorkouts }) {

  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [exerciseDeleted, setExerciseDeleted] = useState(false);



  useEffect(() => {
    if (workoutId !== null && workoutId !== false) {
      axios.get(`http://localhost:3001/getWorkoutExercises/${workoutId}`)
        .then(res => {
          if (res.data.Success) {
            setExercises(res.data.result);

          }
          else {
            console.log("Brak cwiczen");
            setExercises([]);

          }
        })
        .catch(err => {
          console.log(err);
        })
      setNewExerciseAdded(false);
      setExerciseDeleted(false);

    }
  }, [workoutId, newExerciseAdded, exerciseDeleted]);

  return (
    <>
      <GetWorkouts workoutId={workoutId} setWorkoutId={setWorkoutId} selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} exercises={exercises} setExercises={setExercises} workouts={workouts} setWorkouts={setWorkouts} />
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
                  <th colSpan={3} id='thExercises'>Exercises</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={exercise.Exercise_id}>
                    <td >{index + 1}</td>
                    <td >{exercise.Name}</td>
                    <td ><DeleteExerciseFromWorkout workoutId={workoutId} exerciseId={exercise.Exercise_id} setExerciseDeleted={setExerciseDeleted} /></td>
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
    </>
  );
}

export default GetWorkoutExercises;



