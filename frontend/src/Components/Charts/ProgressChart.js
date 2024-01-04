import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ProgressChart.css';

function ProgressChart({ chartData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const labels = chartData.map(dataPoint => new Date(dataPoint.date).toLocaleDateString());
        const dataValues = chartData.map(dataPoint => dataPoint.max_1rm);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: '1RM (kg)',
                    data: dataValues,
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 4,
                    fill: true,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '1RM value (kg)',
                        color: '#333',
                        font: {
                          family: 'Arial',
                          size: 20,
                          lineHeight: 1.2,
                        },
                        
                      }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        color: '#333',
                        font: {
                          family: 'Arial',
                          size: 20,
                          lineHeight: 1.2,
                        },
                        
                      }
                },
            },
        };

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
        });
    }, [chartData]);



    return (
        <>
            <p className='pChartLabel'>{chartData[0].Name} progress chart</p>
            <canvas id="myChart"></canvas>
        </>
    );
}

export default ProgressChart;
