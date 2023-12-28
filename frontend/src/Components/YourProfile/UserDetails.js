import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX } from "@fortawesome/free-solid-svg-icons";
import './UserDetails.css';
import DeleteMeasurement from './DeleteMeasurement';
import MeasurementDetails from "./MeasurementDetails";

function UserDetails({ userId, newMeasurement }) {

    const [userDetails, setUserDetails] = useState([]);
    const [allMeasurements, setAllMeasurements] = useState([]);
    const [deleteMeasurement, setDeleteMeasurement] = useState(false);

    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    var itemsPerPage = 8;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(allMeasurements.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(allMeasurements.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, allMeasurements]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allMeasurements.length;
        setItemOffset(newOffset);
    };


    useEffect(() => {
        axios.get(`http://localhost:3001/getUserDetails/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    setUserDetails(res.data.result);
                    console.log(res.data.result)

                }
                else {
                    console.log(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(`http://localhost:3001/getAllBodyMeasurements/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result)
                    setAllMeasurements(res.data.result);
                }
                else {
                    console.log(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [userId, newMeasurement, deleteMeasurement]);

    return (
        <Card className='CardUserDetails'>
            <Card.Header>User details</Card.Header>
            <ListGroup variant="flush">
                {userDetails.map(userdetails => (
                    <React.Fragment key={userdetails.id}>
                        <ListGroup.Item>Name: {userdetails.first_name} </ListGroup.Item>
                        <ListGroup.Item>E-mail: {userdetails.email} </ListGroup.Item>
                    </React.Fragment>
                ))}
            </ListGroup>

            <Card.Header className='headerBodyDetailsHistory'>Body measurements history</Card.Header>
            <Card.Body className='CardBodyDetailsHistory'>
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {currentItems.map(allmeasurements => (
                        <tbody >
                            <tr key={allmeasurements.id_measurement}>
                                <td>
                                    {new Date(allmeasurements.date).toLocaleString()}
                                </td>
                                <td>
                                    <MeasurementDetails measurement={allmeasurements}/>
                                </td>
                                <td>
                                    <DeleteMeasurement deleteId={allmeasurements.id_measurement} deleteMeasurement={deleteMeasurement} setDeleteMeasurement={setDeleteMeasurement} />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Card.Body>
            <Card.Footer style={{ display: 'flex', justifyContent: 'center' }}>

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={false}
                    containerClassName='paginationUserDetails'
                    pageLinkClassName='pageNumberUserDetails'
                    previousLinkClassName='pageNumberUserDetails'
                    nextLinkClassName='pageNumberUserDetails'
                    activeLinkClassName='active'
                />

            </Card.Footer>


        </Card>
    );
}

export default UserDetails;




