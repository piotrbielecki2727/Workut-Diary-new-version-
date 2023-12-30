import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewExerciseForm from './NewExerciseForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function NewExerciseModal({ setExercisesListUpdate, exercisesListUpdate, isEditing, idToEdit }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {isEditing ? (
                <Button variant='none' onClick={handleShow} className='ExercisesButtonGroupButton' type="submit"><FontAwesomeIcon icon={faPenToSquare} size='xl' />

                </Button >
            ) : (
                <Button variant='dark' onClick={handleShow} className='NewExerciseFormSubmitButton' type="submit"> Add new exercise <FontAwesomeIcon icon={faCheck} size='lg' />

                </Button >
            )
            }
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: 'black', color: 'white', fontSize: '22px' }}>
                    {isEditing ? (
                        "Edit exercise"
                    ) : (
                        "Add new exercise"
                    )
                    }

                </Modal.Header>
                <Modal.Body>
                    <NewExerciseForm isEditing={isEditing} idToEdit={idToEdit} setShow={setShow} show={show} exercisesListUpdate={exercisesListUpdate} setExercisesListUpdate={setExercisesListUpdate} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NewExerciseModal;