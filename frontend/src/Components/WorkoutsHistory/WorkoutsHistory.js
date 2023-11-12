import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { faPlus } from "@fortawesome/free-solid-svg-icons";


import './WorkoutsHistory.css';





function WorkoutsHistory() {

    useEffect(() => {




    },);




    return (
        <div id='background'>
            <Container id='WorkoutsHistoryContainer'>
                xD
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Check</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

        </div>
    );
}

export default WorkoutsHistory;




