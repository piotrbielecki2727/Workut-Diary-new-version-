import axios from 'axios';

export const createNewExercise = async (values) => {
    console.log("dostalem", values);
    try {

        const response = await axios.post("http://localhost:3001/createNewExercise", values)
        if (response.data.Success) {
            console.log("Successfully added new exercise");
        }
        else {
            console.log(response.data.Error)
        }
    }
    catch (error) {
        console.error("There is error.", error);
    }
}



function AddNewExercise() {




}

export default AddNewExercise;




