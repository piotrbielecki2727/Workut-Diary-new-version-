import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MessageForm from './MessageForm';
import './NewMessageModal.css'

function NewMessageModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New message
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='ContactFormModalHeader' closeButton closeVariant='white'>
                    <Modal.Title>New message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MessageForm setShow={setShow} show={show} />
                </Modal.Body>

            </Modal>
        </>
    );
}

export default NewMessageModal;




