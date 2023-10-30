import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Col';
import axios from 'axios';
import GetWorkouts from './GetWorkouts';
import './GetWorkoutExercises.css';
import DeleteExerciseFromWorkout from './DeleteExerciseFromWorkout'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



function GetWorkoutExercises({ newExerciseAdded, setNewExerciseAdded, workoutId, setWorkoutId, workouts, setWorkouts }) {

  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [exerciseDeleted, setExerciseDeleted] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedExercises = Array.from(exercises);
    const [movedExercise] = reorderedExercises.splice(result.source.index, 1);
    reorderedExercises.splice(result.destination.index, 0, movedExercise);

    setExercises(reorderedExercises);

    //console.log("reordered: ", JSON.stringify(reorderedExercises, null, 2));

    const updatedExercises = reorderedExercises.map((exercise, index) => {
      return { ...exercise, Order: index + 1 };
    });

    //console.log("updated: ", JSON.stringify(updatedExercises, null, 2));


    axios.post(`http://localhost:3001/updateExerciseOrder`, { updatedExercises })
      .then(res => {
        if (res.data.Success) {
          console.log("success");
        } else {
          console.error("Error updateExerciseOrder");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  useEffect(() => {
    if (workoutId !== null && workoutId !== false) {
      axios.get(`http://localhost:3001/getWorkoutExercises/${workoutId}`)
        .then(res => {
          if (res.data.Success) {
            setExercises(res.data.result);
            console.log(exercises);

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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="exercises" >
                {(provided) => (
                  <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    striped bordered hover responsive
                  >
                    {exercises.map((exercise, index) => (
                      <Draggable key={exercise.Exercise_id} draggableId={exercise.Exercise_id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card>
                              <Card.Body id='exercisesCardBody'>
                                <Container id='exercisesGrid' fluid>
                                  <Row id='exercisesRow'>
                                    <Col>{exercise.Name}</Col>
                                    <Col><DeleteExerciseFromWorkout workoutId={workoutId} exerciseId={exercise.Exercise_id} setExerciseDeleted={setExerciseDeleted} />
                                    </Col>
                                  </Row>
                                </Container>
                              </Card.Body>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            </DragDropContext>) : (
            <span>There are no exercises.</span>

          )}
        </>

      ) : (
        <></>
      )
      }
    </>
  );
}

export default GetWorkoutExercises;



