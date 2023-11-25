import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import './DeleteMeasurement.css'

function DeleteMeasurement({ deleteId, deleteMeasurement, setDeleteMeasurement }) {

    const deleteMeasurementFromDB = () => {
        axios.delete(`http://localhost:3001/deleteMeasurementFromDB/${deleteId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.Success);
                    setDeleteMeasurement(true);
                }
                else {
                    console.log(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
            })
        setDeleteMeasurement(false);
    }


    return (
        <Button variant="none" className="button" onClick={deleteMeasurementFromDB}>
            <FontAwesomeIcon icon={faX} />
        </Button>
    );
}

export default DeleteMeasurement;




