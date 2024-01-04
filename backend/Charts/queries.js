
const queries = {
    getExercisesForCharts: `SELECT DISTINCT sets.Exercise_id, exercises.Name 
    from sets
    JOIN exercises ON sets.Exercise_id = exercises.id_exercise
    JOIN done_trainings ON done_trainings.id_done_training = sets.Done_Trainings_id_done_training
    JOIN training_groups on done_trainings.Training_Groups_id_group=training_groups.id_group    
    where training_groups.Users_id_user = ?
    AND sets.1RM IS NOT NULL; `,
    
    getChartData: `SELECT MAX(sets.1rm) AS max_1rm, done_trainings.date, exercises.Name
    FROM done_trainings
    JOIN sets ON done_trainings.id_done_training = sets.Done_Trainings_id_done_training
    JOIN training_groups ON done_trainings.Training_Groups_id_group = training_groups.id_group
    JOIN exercises ON sets.Exercise_id = exercises.id_exercise
    WHERE sets.Exercise_id = ?
    AND training_groups.Users_id_user = ?
    GROUP BY done_trainings.date
    ORDER BY max_1rm ASC;`,
};



export default queries;