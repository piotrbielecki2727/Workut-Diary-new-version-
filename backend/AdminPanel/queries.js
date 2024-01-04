
const queries = {
    getUsersListQuery: "SELECT * FROM Users WHERE first_name <> 'admin'",
    updateUserStatus: "UPDATE USERS SET status = ?  WHERE id_user = ?",
    getExercisesListQuery: `SELECT * FROM EXERCISES, MUSCLE_GROUPS WHERE 
    EXERCISES.id_main_muscle_group = MUSCLE_GROUPS.id_muscle_groups`,
    createNewExercise: "INSERT INTO EXERCISES (`Name`, `muscle_group_1`, `muscle_group_2`, `gif`, `description`, `video`, `difficulty`, `equipment`, `id_main_muscle_group`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    deleteExerciseFromDB: "DELETE FROM EXERCISES WHERE id_exercise=?",
    getChoosedExerciseInformationQuery: `SELECT * FROM EXERCISES, muscle_groups where id_exercise=? 
    and EXERCISES.id_main_muscle_group=muscle_groups.id_muscle_groups`,
    editChoosedExerciseInDB:`UPDATE exercises SET Name=?, muscle_group_1=?, muscle_group_2=?, gif=?, 
    description=?, video=?, difficulty=?, equipment=?, id_main_muscle_group=? 
    WHERE id_exercise=?`,
};



export default queries;