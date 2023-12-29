import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GetExercises({ exercisesListUpdate, onExerciseUpdated }) {

    const [exercises, setExercises] = useState([]);

    const getExercisesList = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getExercisesList")
            if (response && response.data) {
                console.log("fetched", response.data.result)
                setExercises(response.data.result)
            }
        }
        catch (error) {
            console.error("Error fetching exercises", error);
        }
    };

    useEffect(() => {
        getExercisesList();
        if (exercisesListUpdate) {
            onExerciseUpdated(false);
        }
    }, [exercisesListUpdate, onExerciseUpdated])

    return exercises;

}

export default GetExercises;




