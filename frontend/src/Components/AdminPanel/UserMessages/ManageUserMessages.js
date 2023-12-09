import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../AdminPanelStyles.css';
import './MessagesStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function ManageUserMessages() {

    return (
        <div id='background'>
            <Container className='MessagesContainer'>
                <Row>
                    <Col className='messageInterface' lg={4}>
                        <Row>
                            <Col className='MessagesHeadingCol'>
                                <Container className='searchBar'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' /> Search...
                                </Container>
                            </Col>
                        </Row>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>
                        <p>xd</p>

                    </Col>
                    <Col className='messagePrint' lg={8}>b</Col>
                </Row>

            </Container>

        </div>
    );
}

export default ManageUserMessages;




