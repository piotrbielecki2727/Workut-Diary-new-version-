import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import './InformationModal.css';


function InformationModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='none' className='ButtonInfo' onClick={handleShow}><FontAwesomeIcon icon={faCircleInfo} /></Button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton className='modalHeader' closeVariant='white'>
                    <Modal.Title>
                        How to measure body parts?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul >
                        <li>Calf:</li>
                        Stand with a slight stance (hip-width apart), weight evenly distributed, calf muscles relaxed. Measure at the widest point, guiding the tape parallel to the ground.

                        <li>Thigh:</li>
                        Stand with a slight stance (hip-width apart), weight evenly distributed, thigh muscles relaxed. Measure just below the buttock fold, guiding the tape parallel to the ground.

                        <li>Hips:</li>
                        Stand with a slight stance (hip-width apart), weight evenly distributed, buttock muscles relaxed. Measure across the middle of the buttocks, guiding the tape parallel to the ground.

                        <li>Waist:</li>
                        Measure at the narrowest point, muscles relaxed (without sucking in the stomach), right after a natural exhale. Guide the tape parallel to the ground.

                        <li>Chest:</li>
                        Measure 1 cm above the nipple line, chest and back muscles relaxed, back straight, arms hanging down, right after a natural exhale. Guide the tape parallel to the ground.

                        <li>Neck:</li>
                        Measure at the narrowest point, neck muscles relaxed, posture straight. Guide the tape parallel to the ground.

                        <li>Biceps:</li>
                        For individuals in bodybuilding and fitness - Measure at the widest point, with the bicep muscles tensed (arm raised to the side or front, strongly flexed, wrist inward). Guide the tape perpendicular to the ground.

                        <li>Forearm:</li>
                        Measure at the widest point, forearm muscles relaxed, arm straight, hanging freely (or raised forward or to the side if preferred), wrist relaxed and straight. Guide the tape parallel to the ground (or perpendicular to the ground if the arm is raised).
                    </ul>
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

export default InformationModal;




