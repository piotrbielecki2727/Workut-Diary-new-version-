import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewExerciseForm from './NewExerciseForm';

function NewExerciseModal({ setExercisesListUpdate, exercisesListUpdate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new exercise
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'black', color: 'white', fontSize: '22px' }}>
                    Add new exercise
                </Modal.Header>
                <Modal.Body>
                    <NewExerciseForm setShow={setShow} show={show} exercisesListUpdate={exercisesListUpdate} setExercisesListUpdate={setExercisesListUpdate} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewExerciseModal;