import { useEffect, useState } from 'react';
import axios from 'axios';

function GetChartData({ chartData, setChartData, choosedExercise, userId }) {


    const getData = async () => {
        try {
            console.log(choosedExercise, userId)
            const response = await axios.get(`http://localhost:3001/getChartData/${choosedExercise}/${userId}`)
            if (response && response.data) {
                console.log("Chart data", response.data.result);
                setChartData(response.data.result)

            }
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        if (choosedExercise && userId)
            getData();
    }, [choosedExercise, userId])

}

export default GetChartData;




