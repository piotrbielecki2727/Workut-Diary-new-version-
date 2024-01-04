import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './ProgressChart.css';


function ChooseExercise({ exercisesForCharts, setExercisesForCharts, choosedExercise, setChoosedExercise }) {



    const handleExerciseChange = (event) => {
        setChoosedExercise(event.target.value);
        console.log(event.target.value);
    };



    return (
        <>
            <Form className='ChartForm'>
                <Form.Group>
                    <Form.Label className='ChooseExerciseFormLabel'>Select the exercise for which you want to check progress</Form.Label>
                    <Form.Control
                        className='ChooseExerciseFormControl'
                        type="select"
                        as="select"
                        required
                        onChange={handleExerciseChange}
                        value={choosedExercise}
                    >
                        <option value="" disabled selected>Choose exercise</option>
                        {exercisesForCharts.map((exercise) => (
                            <option key={exercise.Exercise_id} value={exercise.Exercise_id}>
                                {exercise.Name}
                            </option>
                        ))}

                    </Form.Control>
                    <Form.Control.Feedback type="invalid" >
                        Please choose a valid exercise.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback >
                        Looks good!
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
            <p className='pInformationForChart'>The chart is generated based on the maximum 1RM value for the selected exercise among all completed workouts.</p>
        </>
    );
}

export default ChooseExercise;




