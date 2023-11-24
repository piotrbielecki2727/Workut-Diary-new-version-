import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import AddSetsRepsWeight from '../WorkoutPlanning/AddSetsRepsWeight';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import './Pagination.css'

function Pagination({ data, workoutName, workoutDate, workoutId, CurrentPagination }) {

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    var itemsPerPage;

    if (CurrentPagination === "StartWorkout") { itemsPerPage = 1; }
    else {
        itemsPerPage = 12;
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        console.log(CurrentPagination);
    }, [itemOffset, itemsPerPage, data]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };




    return (
        <>
            {CurrentPagination === "StartWorkout" ? (
                <Container id='RepsWeightContainer'>
                    {currentItems.map((exercise, index) => (
                        <div key={exercise.id_exercise}>
                            <Container id='RepsWeightContainer2'>
                                <h3 id='exerciseNameStartWorkout'>{exercise.Name}</h3>
                                <Image id='RepsWeightContainerImage' fluid src={exercise.gif} alt="exercise_gif" />
                            </Container>
                            <Container id='RepsWeightContainer3'>
                                <AddSetsRepsWeight
                                    exercise={exercise}
                                    workoutId={workoutId}
                                    workoutName={workoutName}
                                    workoutDate={workoutDate}
                                />
                            </Container>
                        </div>
                    ))}
                </Container>
            ) : CurrentPagination === "Exercises" ? (
                <Row className='customRow'>
                    {currentItems.map(exercise => (
                        <Col key={exercise.id_exercise} xs={5} sm={6} md={4} lg={3}>
                            <Link to={`/getExercise/${exercise.main_muscle_group}/${exercise.Name}`} id='muscle-group-link'>
                                <Card className='customCard'>
                                    <Card.Img src={exercise.gif} alt="exercise_gif" />
                                    <Card.Footer className='customCardFooter'>
                                        {exercise.Name}
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : CurrentPagination === "WorkoutHistory" ? (
                <Table responsive striped bordered hover id='WorkoutHistoryTable'>
                    <thead id='WorkoutHistoryThead'>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Check details</th>
                        </tr>
                    </thead>
                    {currentItems.map((workout, index) => (
                        <tbody id='WorkoutHistoryTbody' key={workout.id_done_training}>
                            <tr>
                                <td>{workout.training_group_name}</td>
                                <td>{new Date(workout.date).toLocaleString()}</td>
                                <td>
                                    <Button id='WorkoutHistoryButton' as={Link} to={`/checkDetails/${workout.id_done_training}`}>
                                        <FontAwesomeIcon icon={faEye} /> 
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            ) : null}


            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='pageNumber'
                previousLinkClassName='pageNumber'
                nextLinkClassName='pageNumber'
                activeLinkClassName='active'
            />
        </>
    );
}

export default Pagination;




