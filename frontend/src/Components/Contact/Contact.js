import React from 'react'
import NewMessageModal from './NewMessageModal';
import Container from 'react-bootstrap/Container';
import './Contact.css';

function Contact() {
    return (
        <div id='background'>
            <Container className="ContactContainer">
                <h3>Contact with administration</h3>
                <NewMessageModal />
            </Container>

        </div>
    );
}

export default Contact;




