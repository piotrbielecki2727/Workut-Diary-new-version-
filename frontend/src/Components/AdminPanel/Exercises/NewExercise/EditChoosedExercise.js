import axios from 'axios';

export const editChoosedExercise = async (values) => {
    console.log("dostalem", values);
    try {

        const response = await axios.put(`http://localhost:3001/editChoosedExerciseInDB`, values)
        if (response.data.Success) {
            console.log("Successfully edited exercise");
        }
        else {
            console.log(response.data.Error)
        }
    }
    catch (error) {
        console.error("There is error.", error);
    }
}



function EditChoosedExercise() {




}

export default EditChoosedExercise;




