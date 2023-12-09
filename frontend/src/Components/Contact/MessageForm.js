import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MessageForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { createNewMessage } from './NewMessage';
import { useUserId } from '../UserIdContext';


function MessageForm() {

    const [selectedOption, setSelectedOption] = useState(null);
    const [validated, setValidated] = useState(false);
    const { userId } = useUserId();
    const [values, setValues] = useState({
        userId: userId,
        subject: '',
        messageType: '',
        message: ''
    })



    const handleValueChange = (event, name) => {
        setValues({
            ...values,
            [name]: event.target.value,
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        createNewMessage(values);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="ContactFormGroup">
                    <Form.Label><h5>Subject</h5></Form.Label>
                    <Form.Control
                        className='SubjectFormControl'
                        required
                        type="text"
                        placeholder='Subject'
                        value={values.subject}
                        onChange={(event) => handleValueChange(event, 'subject')}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide subject.
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="ContactFormGroup">
                    <Form.Label><h5>Choose a message type:</h5></Form.Label>
                    <Form.Select
                        required
                        onChange={(event) => handleValueChange(event, 'messageType')}
                        value={values.messageType}
                    >
                        <option value="" disabled selected>Select an option</option>
                        <option value={"Bug"}>Bug</option>
                        <option value={"Site improvement idea"}>Site improvement idea</option>
                        <option value={"Something Else"}>Something else</option>

                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please select message type.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="ContactFormGroup">
                    <Form.Label><h5>Message</h5></Form.Label>
                    <Form.Control
                        required
                        className='SubjectFormControl'
                        as="textarea"
                        rows={5}
                        value={values.message}
                        onChange={(event) => handleValueChange(event, 'message')}
                    />
                    <Form.Control.Feedback type="invalid">
                        Message can't be empty.
                    </Form.Control.Feedback>
                </Form.Group>
                <hr />
                <div className='SendMessageButtonDiv'>
                    <Button variant='dark' className='SendMessageButton' type="submit" >
                        <FontAwesomeIcon icon={faEnvelopeCircleCheck} size='lg' /> Send message</Button>
                </div>
            </Form>

        </>
    );
}

export default MessageForm;




