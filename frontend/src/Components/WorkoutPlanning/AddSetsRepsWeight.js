import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";


import './AddSetsRepsWeight.css';



function AddSetsRepsWeight({ exercise, workoutId }) {
    const [sets, setSets] = useState({});
    const navigate = useNavigate();


    const deleteSet = (prevSets, exerciseId) => {
        const updatedSets = { ...prevSets };
        if (updatedSets[exerciseId] && updatedSets[exerciseId].length > 0) {
            updatedSets[exerciseId].pop();
        }
        return updatedSets;
    };

    const handleInputChange = (e, prevSets, exerciseId, index, field) => {
        const value = e.target.value;
        return {
            ...prevSets,
            [exerciseId]: prevSets[exerciseId].map((set, i) =>
                i === index ? { ...set, [field]: value } : set
            )
        };
    };


    const addSet = () => {
        setSets((prevSets) => ({
            ...prevSets,
            [exercise.Exercise_id]: [
                ...(prevSets[exercise.Exercise_id] || []),
                { weight: '', reps: '', rest: '' }
            ]
        }));

    };

    const saveSet = (index) => {
        setSets((prevSets) => {
            const updatedSets = {
                ...prevSets,
                [exercise.Exercise_id]: prevSets[exercise.Exercise_id].map((set, i) =>
                    i === index
                        ? { ...set, showMaxRep: true, maxrep: calculateMaxRep(parseFloat(set.weight), parseInt(set.reps)) }
                        : set
                ),
            };


            const allSets = Object.keys(updatedSets).flatMap((exerciseId) =>
                updatedSets[exerciseId].map((set) => ({
                    Exercise_id: exerciseId,
                    Repetitions: parseInt(set.reps),
                    Weight: parseFloat(set.weight),
                    rest: parseInt(set.rest),
                    maxrep: set.maxrep,

                }))
            );



            return updatedSets;
        });
    };

    const calculateMaxRep = (weight, reps) => {
        const parsedWeight = parseFloat(weight);
        const parsedReps = parseInt(reps);

        if (isNaN(parsedWeight) || isNaN(parsedReps) || parsedWeight <= 0 || parsedReps <= 0) {
            return '';
        } else {
            return Math.round(parsedWeight * (1 + parsedReps / 30)).toString();
        }
    };

    const saveWorkout = () => {
        if (!sets || Object.keys(sets).length === 0) {
            console.error('No workout sets to save.');
            return;
        }

        const hasSets = Object.keys(sets).some((exerciseId) => sets[exerciseId].length > 0);

        if (!hasSets) {
            console.error('No workout sets to save.');
            return;
        }

        const hasEmptyFields = Object.keys(sets).some((exerciseId) =>
            sets[exerciseId].some((set) => set.weight === '' || set.reps === '' || set.rest === '')
        );

        if (hasEmptyFields) {
            console.error('Please fill in all fields before saving the workout.');
            return;
        }

        const allSets = Object.keys(sets).flatMap((exerciseId) =>
            sets[exerciseId].map((set) => ({
                Exercise_id: exerciseId,
                Repetitions: parseInt(set.reps),
                Weight: parseFloat(set.weight),
                maxrep: calculateMaxRep(parseFloat(set.weight), parseInt(set.reps)),
                rest: parseInt(set.rest),
            }))
        );


        axios.post(`http://localhost:3001/saveAllSets`, { sets: allSets, workoutId: workoutId })
            .then((response) => {
                navigate("/workoutManager");
                console.log('Workout saved successfully!', response.data);
            })
            .catch((error) => {
                console.error('Error saving workout:', error);
            });
    };


    return (
        <>
            <Container id='AddSetsRepsWeightContainer'>
                <Table responsive striped bordered>
                    <thead id='theadAddSetsRepsWeight'>
                        <tr>
                            <th>Sets</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Rest</th>
                        </tr>
                    </thead>
                    <tbody id='tbodyAddSetsRepsWeight'>
                        {sets[exercise.Exercise_id] &&
                            sets[exercise.Exercise_id].map((set, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            disabled
                                            value={index + 1}
                                            id='inputAddSetsRepsWeight1'
                                        /></td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            max='1000'
                                            value={set.weight}
                                            onChange={(e) => setSets(handleInputChange(e, sets, exercise.Exercise_id, index, 'weight'))}
                                            required
                                            id='inputAddSetsRepsWeight2'
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            max='100'
                                            value={set.reps}
                                            onChange={(e) => setSets(handleInputChange(e, sets, exercise.Exercise_id, index, 'reps'))}
                                            required
                                            id='inputAddSetsRepsWeight2'
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            max='100'
                                            value={set.rest}
                                            onChange={(e) => setSets(handleInputChange(e, sets, exercise.Exercise_id, index, 'rest'))}
                                            required
                                            id='inputAddSetsRepsWeight2'
                                        />
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </Table>

                <Container id='AddSetDeleteSet'>
                    <Button
                        id='addSetsRepsAddSetButton'
                        onClick={addSet}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                        id='addSetsRepsDeleteSetButton'
                        onClick={() => setSets(deleteSet(sets, exercise.Exercise_id))}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                </Container>
            </Container >
            <Container id='addSetsRepsAddSaveButtonContainer'>
                {Object.keys(sets).length > 0 && (
                    <Button id='addSetsRepsAddSaveButton' onClick={saveWorkout}>Save Workout</Button>
                )}
            </Container>
        </>
    );
}

export default AddSetsRepsWeight;
