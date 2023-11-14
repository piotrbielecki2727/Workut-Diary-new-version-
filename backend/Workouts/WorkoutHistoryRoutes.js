import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

    router.get(`/getUserDoneWorkouts/:userId`, (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        const query = ` select id_done_training, date, training_groups.name as training_group_name from done_trainings, training_groups
        where
        done_trainings.Training_Groups_id_group=training_groups.id_group
        and training_groups.Users_id_user=?;`

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error when get done workouts" })
            }
            return res.json({ Success: "Success", result })
        })
    })




    return router;

};
export default createRoutes;