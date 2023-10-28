import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import GetWorkouts from './GetWorkouts';



function GetWorkoutExercises({ newExerciseAdded, setNewExerciseAdded, workoutId, setWorkoutId }) {

  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [exercises, setExercises] = useState(false);

  useEffect(() => {
    if (workoutId !== null) {
      console.log("dla workoutu: " + workoutId);
      axios.get(`http://localhost:3001/getWorkoutExercises/${workoutId}`)
        .then(res => {
          if (res.data.Success) {
            console.log(res.data.result);
            setExercises(res.data.result);
          }
          else {
            console.log("Error getWorkoutExercises");
          }
        })
        .catch(err => {
          console.log(err);
        })
      setNewExerciseAdded(false);

    }
  }, [workoutId, newExerciseAdded]);

  return (
    <>
      <GetWorkouts workoutId={workoutId} setWorkoutId={setWorkoutId} selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} exercises={exercises} setExercises={setExercises}/>
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
                  <th>Exercises</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={exercise.exercise_id}>
                    <td >{index + 1}</td>
                    <td >{exercise.Name}</td>
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



