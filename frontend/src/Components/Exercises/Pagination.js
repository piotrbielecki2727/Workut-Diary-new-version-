import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import './Pagination.css'

function Pagination(props) {

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const { data } = props;
    const itemsPerPage = 12;

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
            <Row className='customRow'>
                {currentItems.map(exercise => (
                    exercise.gif && (
                        <Col key={exercise.id_exercise} xs={5} sm={6} md={4} lg={3}>
                            <Link to={`/getExercise/${exercise.id_exercise}`} id='muscle-group-link'><Card className='customCard'>
                                <Card.Img src={exercise.gif} alt="exercise_gif" />
                                <Card.Footer className='customCardFooter'>
                                    {exercise.Name}
                                </Card.Footer>
                            </Card>
                            </Link>
                        </Col>
                    )
                ))}

            </Row>
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




