import React from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



import './WorkoutPlanner.css';


function WorkoutPlanner() {
    return (
        <Container fluid="lg" id='workoutPlannerContainer'>
            <h3>Choosed workout:</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last performed</th>
                    </tr>
                </thead>
            <tbody>
                <tr>
                    <td>w chuj</td>
                    <td>dawno</td>
                </tr>
            </tbody>
            </Table>
            <Button>Add exercises</Button>
        </Container>
    );
}

export default WorkoutPlanner;




