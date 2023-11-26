import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import './MeasurementDetails.css';


function MeasurementDetails({ measurement }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(measurement);
        setShow(true)
    };

    return (
        <>
            <Button variant="none" className="button" onClick={handleShow} >
                <FontAwesomeIcon icon={faEye} />
            </Button>            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='modalHeader' closeVariant='white'>
                    <Modal.Title>
                    Body measurements (Cm / Kg) </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive bordered hover striped className='MeasurementDetailsTable'>
                        <thead>
                            <tr>
                                <th>Neck</th>
                                <th>Biceps</th>
                                <th>Forearm</th>
                                <th>Chest</th>
                                <th>Waist</th>
                                <th>Hips</th>
                                <th>Thigh</th>
                                <th>Calf</th>
                                <th>Weight</th>
                                <th>Height</th>
                            </tr>
                        </thead>
                        <tbody key={measurement.id_measurement}>
                            <tr>
                                <td>
                                    {measurement.neck}
                                </td>
                                <td>
                                    {measurement.biceps}
                                </td>
                                <td>
                                    {measurement.forearm}
                                </td>
                                <td>
                                    {measurement.chest}
                                </td>
                                <td>
                                    {measurement.waist}
                                </td>
                                <td>
                                    {measurement.hips}
                                </td>
                                <td>
                                    {measurement.thigh}
                                </td>
                                <td>
                                    {measurement.calf}
                                </td>
                                <td>
                                    {measurement.weight} 
                                </td>
                                <td>
                                    {measurement.height} 
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="buttonClose" variant='dark' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MeasurementDetails;




