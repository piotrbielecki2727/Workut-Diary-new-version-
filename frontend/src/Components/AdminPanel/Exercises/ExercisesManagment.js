import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import AdminPanelSearchBar from '../AdminPanelSearchBar';
import GetExercises from './GetExercises';
import '../AdminPanelStyles.css';
import NewExerciseModal from './NewExercise/NewExerciseModal';


function ExercisesManagment() {

  const CurrentPagination = "Exercises";
  const [exercisesListUpdate, setExercisesListUpdate] = useState(false);
  const exercises = GetExercises({ exercisesListUpdate, onExerciseUpdated: setExercisesListUpdate });



  return (
    <div id='background'>
      <Container className='AdminPanelContainer'>
        <h3>Exercises list</h3>
        <NewExerciseModal setExercisesListUpdate={setExercisesListUpdate} exercisesListUpdate={exercisesListUpdate} />
        <AdminPanelSearchBar data={exercises} CurrentPagination={CurrentPagination} setExercisesListUpdate={setExercisesListUpdate} exercisesListUpdate={exercisesListUpdate} />

      </Container>

    </div>
  );
}

export default ExercisesManagment;




