import React from 'react'
import Container from 'react-bootstrap/Container';
import AdminPanelSearchBar from '../AdminPanelSearchBar';
import GetExercises from './GetExercises';
import '../AdminPanelStyles.css';


function ExercisesManagment() {

  const CurrentPagination = "Exercises";
  const exercises = GetExercises();


  return (
    <div id='background'>
      <Container className='AdminPanelContainer'>
        <h3>Exercises list</h3>
        <AdminPanelSearchBar data={exercises} CurrentPagination={CurrentPagination} />
      </Container>

    </div>
  );
}

export default ExercisesManagment;




