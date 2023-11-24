import React from 'react'
import LastWorkout from '../Workouts/LastWorkout';
import {
    useParams, useNavigate
} from "react-router-dom";
function CheckDetails() {

    const { id_done_training } = useParams();

    return (
        <LastWorkout workoutId={id_done_training} />
    );
}

export default CheckDetails;




