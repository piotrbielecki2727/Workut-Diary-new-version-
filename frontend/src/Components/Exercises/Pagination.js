import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import AddSetsRepsWeight from '../WorkoutPlanning/AddSetsRepsWeight';

import './Pagination.css'

function Pagination({ data, StartWorkout, workoutName, workoutDate, workoutId }) {

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    var itemsPerPage;

    if (StartWorkout === true) { itemsPerPage = 1; }
    else { { itemsPerPage = 12; } }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };




    return (
        <>
            {StartWorkout ? (
                <Container id='RepsWeightContainer'>

                    {currentItems.map((exercise, index) => (
                        exercise.gif && (
                            <div key={exercise.id_exercise}>
                                <Container id='RepsWeightContainer2'>
                                    <h4>{exercise.Name}</h4>
                                    <Image id='RepsWeightContainerImage' fluid src={exercise.gif} alt="exercise_gif" />
                                </Container>
                                <Container id='RepsWeightContainer3'><AddSetsRepsWeight exercise={exercise} workoutId={workoutId} workoutName={workoutName} workoutDate={workoutDate} /></Container>


                            </div>

                        )
                    ))}
                </Container>
            )

                : (<Row className='customRow'>
                    {currentItems.map(exercise => (
                        exercise.gif && (
                            <Col key={exercise.id_exercise} xs={5} sm={6} md={4} lg={3}>
                                <Link to={`/getExercise/${exercise.Name}`} id='muscle-group-link'><Card className='customCard'>
                                    <Card.Img src={exercise.gif} alt="exercise_gif" />
                                    <Card.Footer className='customCardFooter'>
                                        {exercise.Name}
                                    </Card.Footer>
                                </Card>
                                </Link>
                            </Col>
                        )
                    ))}

                </Row >)
            }

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




