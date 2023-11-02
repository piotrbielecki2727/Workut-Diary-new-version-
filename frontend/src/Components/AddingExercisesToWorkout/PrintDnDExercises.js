import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteExerciseFromWorkout from './DeleteExerciseFromWorkout'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import './PrintDnDExercises.css';


function PrintDnDExercises({ WorkoutPlanner, exercises, setExercises, workoutId, setNewExerciseAdded, newExerciseAdded }) {


    const [exerciseDeleted, setExerciseDeleted] = useState(false);


    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedExercises = Array.from(exercises);
        const [movedExercise] = reorderedExercises.splice(result.source.index, 1);
        reorderedExercises.splice(result.destination.index, 0, movedExercise);

        setExercises(reorderedExercises);

        const updatedExercises = reorderedExercises.map((exercise, index) => {
            return { ...exercise, Order: index + 1 };
        });

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
            {exercises.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="exercises" >
                        {(provided) => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                striped bordered hover responsive
                                id='chosenWorkoutContainer1'
                            >
                                {exercises.map((exercise, index) => (
                                    <Draggable key={exercise.Exercise_id} draggableId={exercise.Exercise_id.toString()} index={index}>
                                        {(provided) => (
                                            <Container
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                id='chosenWorkoutContainer2'
                                            >
                                                {WorkoutPlanner ? (
                                                    <Row id='chosenWorkoutRowPlanner'>
                                                        <Col xs={4} lg={3} id='imageCol'><Image src={exercise.gif} fluid></Image></Col>
                                                        <Col xs={8} lg={9} >
                                                            <Row id='exerciseNameRow'>
                                                                <Col xs={9} lg={11}>{exercise.Name}</Col>
                                                                <Col xs={3} lg={1}>
                                                                    <DeleteExerciseFromWorkout
                                                                        workoutId={workoutId}
                                                                        exerciseId={exercise.Exercise_id}
                                                                        setExerciseDeleted={setExerciseDeleted} />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Row id='lastPerformedRow' > Last performed sets:</Row>
                                                                    <Table striped bordered hover responsive >
                                                                        <thead >
                                                                            <tr id='plannerthead'>
                                                                                <th>Set</th>
                                                                                <th>Reps</th>
                                                                                <th>Weight</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody >
                                                                            <tr id='plannertbody'>
                                                                                <td>1</td>
                                                                                <td>12</td>
                                                                                <td>120</td>

                                                                            </tr>


                                                                        </tbody>
                                                                    </Table>

                                                                </Col>


                                                            </Row>
                                                        </Col>

                                                    </Row>
                                                ) : (<>
                                                    <Row id='chosenWorkoutRow'>
                                                        <Col xs={4}><Image src={exercise.gif} fluid></Image></Col>
                                                        <Col xs={6}>{exercise.Name}</Col>
                                                        <Col xs={2}><DeleteExerciseFromWorkout
                                                            workoutId={workoutId}
                                                            exerciseId={exercise.Exercise_id}
                                                            setExerciseDeleted={setExerciseDeleted} />
                                                        </Col>
                                                    </Row>
                                                </>
                                                )}
                                            </Container>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext >
            ) : (
                <h5>This workout is empty</h5>
            )}
        </>
    );
}

export default PrintDnDExercises;








