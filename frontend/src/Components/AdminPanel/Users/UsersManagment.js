import React, { useState, useEffect } from 'react'
import GetUsers from './GetUsers';
import Container from 'react-bootstrap/Container';
import '../AdminPanelStyles.css';
import AdminPanelSearchBar from '../AdminPanelSearchBar';


function UsersManagment() {

  const CurrentPagination = "Users";
  const [userUpdated, setUserUpdated] = useState(false);
  const users = GetUsers({ userUpdated, onUserUpdate: setUserUpdated });


  return (
    <div id='background'>
      <Container className="AdminPanelContainer">
        <h3>Users list</h3>
        <AdminPanelSearchBar
          data={users}
          userUpdated={userUpdated}
          setUserUpdated={setUserUpdated}
          CurrentPagination={CurrentPagination}
        />
      </Container>

    </div>
  );
}

export default UsersManagment;




