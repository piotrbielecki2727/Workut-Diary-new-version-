
const queries = {
    getUsersListQuery: "SELECT * FROM Users WHERE first_name <> 'admin'",
    updateUserStatus: "UPDATE USERS SET status = ?  WHERE id_user = ?",
    getExercisesListQuery: "SELECT * FROM EXERCISES"

};



export default queries;