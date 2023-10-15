import React, { useState, useEffect } from "react";
import './WorkoutManager.css';
import { Container, Row, Col, Button, ButtonGroup, Form, Table } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';


function WorkoutManager() {
    const userId = Cookies.get('userId');

    return (
        <div className="workoutManager">
        </div>
    );
}

export default WorkoutManager;
