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

function PrintExercisesTable({ currentItems }) {

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
                        <td>{exercise.main_muscle_group}</td>
                        <td>

                            <ButtonGroup>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Details")}
                                >
                                    <Button as={Link} to={`/getExercise/${exercise.main_muscle_group}/${exercise.Name}`} className='ExercisesButtonGroupButton' variant='none'><FontAwesomeIcon icon={faCircleInfo} size='xl' /></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Edit")}
                                >
                                    <Button className='ExercisesButtonGroupButton' variant='none'><FontAwesomeIcon icon={faPenToSquare} size='xl' /></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={(props) => renderTooltip(props, "Delete")}
                                >
                                    <Button className='ExercisesButtonGroupButton' variant='none'><FontAwesomeIcon icon={faTrash} size='xl' /></Button>
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




