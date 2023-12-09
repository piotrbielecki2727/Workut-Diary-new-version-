import React from 'react'
import Table from 'react-bootstrap/Table';
import UpdateUserStatus from './UpdateUserStatus';
import './PrintUsersTable.css';

function PrintUsersTable({ currentItems, setUserUpdated, userUpdated }) {
    return (
        <Table className='AdminPanelTable' responsive striped bordered hover>
            <thead>
                <tr >
                    <th>First name</th>
                    <th>Email</th>
                    <th>Last logged in</th>
                    <th>Status</th>
                    <th>Block/Unblock</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map(user => (
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
    );
}

export default PrintUsersTable;




