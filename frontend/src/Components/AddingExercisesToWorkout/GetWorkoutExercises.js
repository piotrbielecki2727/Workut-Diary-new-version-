import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import GetWorkouts from './GetWorkouts';
import './GetWorkoutExercises.css';
import PrintDnDExercises from './PrintDnDExercises';




function GetWorkoutExercises({ selectedWorkout, setSelectedWorkout, newExerciseAdded, setNewExerciseAdded, workoutId, setWorkoutId, workouts, setWorkouts }) {

  
  const [exercises, setExercises] = useState(false);

  console.log("exercises", exercises); // Tutaj możesz zobaczyć zawartość exercises


  return (
    <>
      <GetWorkouts workoutId={workoutId} setWorkoutId={setWorkoutId} selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} exercises={exercises} setExercises={setExercises} workouts={workouts} setWorkouts={setWorkouts} />
      {selectedWorkout ? (
        <>
          <h5 id='h5ChosenWorkout'>Chosen workout:</h5>
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

          <PrintDnDExercises exercises={exercises} setExercises={setExercises} workoutId={workoutId} newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} />
          {exercises.length > 0 ? (
            <></>
          ) : (
            <span>There are no exercises</span>
          )
          }

        </>

      ) : (
        <></>
      )
      }
    </>
  );
}

export default GetWorkoutExercises;



