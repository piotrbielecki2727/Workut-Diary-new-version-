import { useEffect, useState } from 'react';
import axios from 'axios';

function GetChoosedExercise({ exercisesListUpdate, onExerciseUpdated, idToEdit, values, setValues }) {


    const getChoosedExerciseInformation = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getChoosedExerciseInformation/${idToEdit}`)
            if (response && response.data) {
                console.log("fetchedddd", response.data.result)
                setValues(response.data.result)
            }
        }
        catch (error) {
            console.error("Error fetching exercises", error);
        }
    };

    useEffect(() => {
        getChoosedExerciseInformation();
        if (exercisesListUpdate) {
            onExerciseUpdated(false);
        }
    }, [exercisesListUpdate, onExerciseUpdated])

}

export default GetChoosedExercise;




