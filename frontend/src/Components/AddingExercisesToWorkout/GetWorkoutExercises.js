import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import GetWorkouts from './GetWorkouts';
import './GetWorkoutExercises.css';
import PrintDnDExercises from './PrintDnDExercises';




function GetWorkoutExercises({ selectedWorkout, setSelectedWorkout, newExerciseAdded, setNewExerciseAdded, workoutId, setWorkoutId, workouts, setWorkouts }) {

  
  const [exercises, setExercises] = useState(false);


  return (
    <>
      <GetWorkouts workoutId={workoutId} setWorkoutId={setWorkoutId} selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} exercises={exercises} setExercises={setExercises} workouts={workouts} setWorkouts={setWorkouts} />
      {selectedWorkout ? (
        <>
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



