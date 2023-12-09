import axios from 'axios';

export const createNewMessage = async (values) => {
    console.log(values);
    try {

        const response = await axios.post("http://localhost:3001/createNewMessage", values)
        if (response.data.Success) {
            console.log("Successfully sent message");
        }
        else {
            console.log(response.data.Error)
        }
    }
    catch (error) {
        console.error("There is error.", error);
    }
}



function NewMessage() {




}

export default NewMessage;




