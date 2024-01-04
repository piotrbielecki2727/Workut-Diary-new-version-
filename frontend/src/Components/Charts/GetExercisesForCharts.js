import { useEffect, useState } from 'react';
import axios from 'axios';

function GetExercisesForCharts({ setExercisesForCharts, exercisesForCharts, userId }) {


    const getExercises = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getExercisesForCharts/${userId}`)
            if (response && response.data) {
                console.log(response.data.result);
                setExercisesForCharts(response.data.result)
            }
        }
        catch (error) {
            console.error("Error fetching exercises", error);
        }
    };

    useEffect(() => {
        getExercises();
    }, [userId])

}

export default GetExercisesForCharts;




