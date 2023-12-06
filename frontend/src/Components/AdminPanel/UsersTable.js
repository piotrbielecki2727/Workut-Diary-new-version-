import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './UsersTable.css';
import GetUsers from './GetUsers';
import UpdateUserStatus from './UpdateUserStatus';

function UsersTable() {


    const [userUpdated, setUserUpdated] = useState(false);

    const users = GetUsers({ userUpdated, onUserUpdate: setUserUpdated });

    return (
        <>
            <Table  className='UsersTable'  responsive striped bordered hover>
                <thead>
                    <tr >
                        <th>First name</th>
                        <th>Email</th>
                        <th>Last logged in</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id_user}>
                            <td>{user.first_name}</td>
                            <td>{user.Email}</td>
                            <td>{new Date(user.last_logged_in).toLocaleString()}</td>
                            <td>{user.Status}</td>
                            <td><UpdateUserStatus userId={user.id_user} status={user.Status} userUpdated={userUpdated} setUserUpdated={setUserUpdated} /></td>
                        </tr>
                    ))}

                </tbody>

            </Table>

        </>
    );
}

export default UsersTable;




