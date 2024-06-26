import React from 'react'
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';


import '../AdminPanelStyles.css';
import DeleteExercise from './DeleteExercise';
import NewExerciseModal from './NewExercise/NewExerciseModal';

function PrintExercisesTable({ currentItems, exercisesListUpdate, setExercisesListUpdate }) {

    const renderTooltip = (props, tooltipMessage) => (
        <Tooltip id="button-tooltip" {...props}>
            {tooltipMessage}
        </Tooltip>
    );




    return (
        <Table className='AdminPanelTable' responsive striped bordered hover>
            <thead>
                <tr >
                    <th>Name</th>
                    <th>Main muscle group</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map(exercise => (
                    <tr key={exercise.id_exercise}>
                        <td>{exercise.Name}</td>
                        <td>{exercise.muscle_group}</td>
                        <td>

                            <ButtonGroup>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Details")}
                                >
                                    <Button as={Link} to={`/getExercise/${exercise.muscle_group}/${exercise.Name}`} className='ExercisesButtonGroupButton' variant='none'><FontAwesomeIcon icon={faCircleInfo} size='xl' /></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Edit")}
                                >
                                    <NewExerciseModal idToEdit={exercise.id_exercise} isEditing={true} setExercisesListUpdate={setExercisesListUpdate} exercisesListUpdate={exercisesListUpdate}  />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Delete")}
                                >
                                    <DeleteExercise idToDelete={exercise.id_exercise} setExercisesListUpdate={setExercisesListUpdate} exercisesListUpdate={exercisesListUpdate} />
                                </OverlayTrigger>
                            </ButtonGroup>

                        </td>

                    </tr>
                ))
                }

            </tbody >

        </Table >
    );
}

export default PrintExercisesTable;




