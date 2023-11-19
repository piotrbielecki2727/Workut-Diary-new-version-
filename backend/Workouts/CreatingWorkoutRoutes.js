import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

    router.post('/createWorkout', (req, res) => {
        const values = [
            req.body.Name,
            req.body.Users_id_user
        ]

        const query = "INSERT INTO Training_Groups (Name ,Users_id_user) VALUES (?)"
        const query_select = "SELECT Name from Training_Groups where Users_id_user=?"
        db.query(query_select, [req.body.Users_id_user], (err, result) => {
            const existingWorkout = result.find(workout => workout.Name === req.body.Name);
            if (existingWorkout) {
                return res.json({ Error: "Workout of this name already exist in your workout list." });
            }
            else {
                db.query(query, [values], (err, result) => {
                    if (req.body.Name.length > 45) {
                        return res.json({ Error: "The length of the training name can't be longer than 45 characters." });
                    }
                    else if (req.body.Name.length === 0) {
                        return res.json({ Error: "Training name can't be empty." });
                    }

                    else if (err) {
                        return res.json({ Error: "Error inserting workout to database" });
                    } else {
                        return res.json({ Success: "Success" });
                    }
                })
            }
        })
    })



    router.delete('/deleteWorkout/:workoutId', (req, res) => {
        const workoutId = req.params.workoutId;
        console.log(workoutId);
        console.log("id workouto do usuniecia w backendzie to:" + workoutId)
        const query = "DELETE FROM Training_Groups WHERE id_group = ?";

        db.query(query, [workoutId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error when deleting" })
            }
            return res.json({ Success: "Workout deleted" })
        })
    }
    )

    router.put("/editWorkout", (req, res) => {
        console.log(req.body.Name);
        console.log(req.body.Users_id_user);
        console.log(req.body.workoutId);
        const query = "UPDATE Training_Groups SET Name=? WHERE id_group=?";
        const query_select = "SELECT Name from Training_Groups where Users_id_user=?"
        db.query(query_select, [req.body.Users_id_user], (err, result) => {
            const existingWorkout = result.find(workout => workout.Name === req.body.Name);
            if (existingWorkout) {
                return res.json({ Error: "Workout of this name already exist in your workout list." });
            }
            else {
                db.query(query, [req.body.Name, req.body.workoutId], (err, result) => {
                    if (req.body.Name.length > 45) {
                        return res.json({ Error: "The length of the training name can't be longer than 45 characters." });
                    }
                    else if (req.body.Name.length === 0) {
                        return res.json({ Error: "Training name can't be empty." });
                    }
                    else if (err) {
                        return res.json({ Error: "Error editing workout name." });
                    } else {
                        return res.json({ Success: "Success" });
                    }
                })
            }
        })
    }
    )

    router.get('/getTrainingGroups/:userId', (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        const query = `
          SELECT 
            training_groups.id_group, 
            training_groups.name
          FROM 
            training_groups
          WHERE 
          training_groups.Users_id_user = ?`;

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error getting data" });
            } else {
                return res.json({ Success: "Success", result });
            }
        });
    });


    router.get('/getWorkouts/:userId', (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        const query = `
        SELECT 
        training_groups.id_group, 
        training_groups.name,
        MAX(done_trainings.id_done_training) AS latest_done_training_id, 
        MAX(done_trainings.date) AS latest_date
    FROM 
        training_groups 
    LEFT JOIN 
        done_trainings ON done_trainings.Training_Groups_id_group = training_groups.id_group 
    WHERE 
        training_groups.Users_id_user = ?
    GROUP BY
        training_groups.id_group, 
        training_groups.name`;

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error getting data" });
            } else {
                return res.json({ Success: "Success", result });
            }
        });
    });


    router.get('/getWorkout/:workoutId', (req, res) => {
        const workoutId = req.params.workoutId;
        const query = "SELECT id_group,Name from Training_Groups where id_group = ?";
        db.query(query, [workoutId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error get data" })
            }
            else {
                return res.json({ Success: "Success", result });
            }
        })
    })



    return router;
};

export default createRoutes;