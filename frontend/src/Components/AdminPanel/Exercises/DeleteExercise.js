import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'




function DeleteExercise({ idToDelete, setExercisesListUpdate, exercisesListUpdate }) {

    const deleteExercise = async () => {
        console.log("dostalem", idToDelete);
        try {

            const response = await axios.delete(`http://localhost:3001/deleteExerciseFromDB/${idToDelete}`,)
            if (response.data.Success) {
                console.log("Successfully deleted exercise");
                setExercisesListUpdate(true);
            }
            else {
                console.log(response.data.Error)
            }
        }
        catch (error) {
            console.error("There is error.", error);
        }
        setExercisesListUpdate(false);
    }

    return (
        <Button onClick={deleteExercise} variant='none'><FontAwesomeIcon icon={faTrash} size='xl' /></Button>
    )

}

export default DeleteExercise;




