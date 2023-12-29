
const queries = {
    getUsersListQuery: "SELECT * FROM Users WHERE first_name <> 'admin'",
    updateUserStatus: "UPDATE USERS SET status = ?  WHERE id_user = ?",
    getExercisesListQuery: "SELECT * FROM EXERCISES",
    createNewExercise: "INSERT INTO EXERCISES (`Name`, `main_muscle_group`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    deleteExerciseFromDB: "DELETE FROM EXERCISES WHERE id_exercise=?"
};



export default queries;