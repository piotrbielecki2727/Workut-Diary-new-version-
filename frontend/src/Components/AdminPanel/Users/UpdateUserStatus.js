import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './UpdateUserStatus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'



function UpdateUserStatus({ userId, status, setUserUpdated, userUpdated }) {


    const [values, setValues] = useState({
        userId: userId,
        status: status
    })


    const updateUserStatus = async () => {

        const newStatus = values.status === "Active" ? "Blocked" : "Active";

        setValues(prevValues => ({
            ...prevValues,
            status: newStatus
        }));

        const requestData = {
            userId: values.userId,
            status: newStatus
        };


        try {
            const response = await axios.post("http://localhost:3001/updateUserStatus", requestData)
            if (response.data.Success) {
                console.log(response.data.Success);
                setUserUpdated(true);

            } else {
                console.log(response.data.Error);

            }
        }
        catch (error) {
            console.error("Error changing user status.", error);
        }
        setUserUpdated(false);

    }

    return (
        <>
            {status === "Active" ?
                (
                    <Button className='blockUserButton' variant='link'  onClick={updateUserStatus}><FontAwesomeIcon icon={faLock} size='lg' /></Button>
                )
                :
                (
                    <Button className='unBlockUserButton' variant='link'  onClick={updateUserStatus}><FontAwesomeIcon icon={faLockOpen} size='lg' /></Button>
                )
            }
        </>
    )
}

export default UpdateUserStatus;




