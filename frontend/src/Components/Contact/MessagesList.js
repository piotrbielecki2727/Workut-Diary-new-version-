import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import './MessagesList.css';

import { Link } from "react-router-dom";

function MessagesList() {

    return (
        <>
            <ListGroup as="ol" numbered>
                <ListGroup.Item
                    action as={Link} to={"/"}
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-1 me-auto">
                        <div className="fw-bold">Problem with loggin in (Bug)</div>
                        <div className='xd'>Cras 
                        justsssssssssssso odio</div>
                    </div>
                    <Badge bg="primary" pill>
                        14.11.2023
                    </Badge>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default MessagesList;




