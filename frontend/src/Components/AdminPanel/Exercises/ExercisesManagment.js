import React from 'react'
import Container from 'react-bootstrap/Container';
import AdminPanelSearchBar from '../AdminPanelSearchBar';
import GetExercises from './GetExercises';
import '../AdminPanelStyles.css';
import NewExercise from './NewExercise/NewExercise';


function ExercisesManagment() {

  const CurrentPagination = "Exercises";
  const exercises = GetExercises();


  return (
    <div id='background'>
      <Container className='AdminPanelContainer'>
        <h3>Exercises list</h3>
        <NewExercise />
        <AdminPanelSearchBar data={exercises} CurrentPagination={CurrentPagination} />
       
      </Container>

    </div>
  );
}

export default ExercisesManagment;




