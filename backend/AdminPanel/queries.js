
const queries = {
    getUsersListQuery: "SELECT * FROM Users WHERE first_name <> 'admin'",
    updateUserStatus: "UPDATE USERS SET status = ?  WHERE id_user = ?"

};



export default queries;