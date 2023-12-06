import React, { useEffect, useState } from 'react';
import axios from 'axios';



function GetUsers({ userUpdated, onUserUpdate }) {

    const [users, setUsers] = useState([]);


    const getUsersList = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getUsersList")
            if (response && response.data) {
                setUsers(response.data.result);
            }
        }
        catch (error) {
            console.error("Error fetching users list", error);
        }
    };

    useEffect(() => {
        getUsersList();
        if (userUpdated) {
            onUserUpdate(false);
        }
    }, [userUpdated, onUserUpdate]);



    return users;
}

export default GetUsers;