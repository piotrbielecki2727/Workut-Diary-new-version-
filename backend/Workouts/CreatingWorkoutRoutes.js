import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

    router.post('/createWorkout', (req, res) => {
        const values = [
            req.body.Name,
            req.body.Users_id_user
        ]
        const query = "INSERT INTO Training_Groups (Name ,Users_id_user) VALUES (?)"
        db.query(query, [values], (err, result) => {
            if (err) {
                return res.json({ Error: "Error inserting workout to database" })
            }
            else {
                return res.json({ Success: "Data added to database" })
            }
        })
    }
    )



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

    router.put("/editWorkout/:workoutId", (req, res) => {
        const workoutId = req.params.workoutId;
        console.log(workoutId);
        console.log(req.body.Name);
        const query = "UPDATE Training_Groups SET Name=? WHERE id_group=?";
        db.query(query, [req.body.Name, workoutId], (err, result) => {
            if (err) {
                return res.json({ Error: "Error when updating" })
            }
            else {
                return res.json({ Success: "Workout edited" })
            }
        })
    }
    )

    router.get('/getTrainingGroups/:userId', (req, res) => {
        const userId = req.params.userId;
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
        training_groups.Users_id_user = 5
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