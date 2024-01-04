import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import ChooseExercise from './ChooseExercise';
import ProgressChart from './ProgressChart';
import GetExercisesForCharts from './GetExercisesForCharts';
import GetChartData from './GetChartData';
import { useUserId } from '../UserIdContext';

import './ProgressChart.css';

function CheckYourProgress() {

    const [exercisesForCharts, setExercisesForCharts] = useState([]);
    const [choosedExercise, setChoosedExercise] = useState(null);
    const [chartData, setChartData] = useState(null);
    const { userId } = useUserId();


    return (
        <div id='background'>
            <Container className='WholeChartContainer'>
                <GetExercisesForCharts exercisesForCharts={exercisesForCharts} setExercisesForCharts={setExercisesForCharts} userId={userId} />
                <ChooseExercise exercisesForCharts={exercisesForCharts} choosedExercise={choosedExercise} setChoosedExercise={setChoosedExercise} />
                <GetChartData choosedExercise={choosedExercise} userId={userId} chartData={chartData} setChartData={setChartData} />

                {chartData ?
                    (
                        <>
                            <Container className='ChartContainer'>
                                <ProgressChart chartData={chartData} />
                            </Container>
                        </>)
                    :
                    (<></>)}

            </Container >
        </div>
    );
}

export default CheckYourProgress;




