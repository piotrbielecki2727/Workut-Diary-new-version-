import React from 'react'
import GetUsers from './GetUsers';
import UsersTable from './UsersTable';
import Container from 'react-bootstrap/Container';
import './UsersManagment.css';


function UsersManagment() {


 

  return (
    <div id='background'>
      <Container className="UsersManagmentContainer">
        <h3>Users list</h3>
        <UsersTable />
      </Container>

    </div>
  );
}

export default UsersManagment;




