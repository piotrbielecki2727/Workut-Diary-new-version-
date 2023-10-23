import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

  router.post('/createWorkout', (req, res) => {
    console.log(req.body);
    const values = [
      req.body.Name,
      req.body.Date,
      req.body.Users_id_user
    ]
    const query = "INSERT INTO WORKOUTS (Name, Date,Users_id_user) VALUES (?)"
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


  router.get('/getWorkouts/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const query = "SELECT id_workout,Name,Date from workouts where Users_id_user = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error get data" })
      }
      else {
        return res.json({ Success: "Workouts got", result })
      }
    })
  })


  router.delete("/deleteWorkout", (req, res) => {
    const workoutId = req.body.workoutId;
    console.log(workoutId);
    const query = "DELETE FROM WORKOUTS WHERE id_workout = ?";

    db.query(query, [workoutId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error when deleting" })
      }
      else {
        return res.json({ Success: "Workout deleted" })
      }
    })
  }
  )

  router.put("/editWorkout/:workoutId", (req, res) => {
    console.log(req.body);
    const workoutId = req.params.workoutId;
   
    const query = "UPDATE workouts SET Name=?, Date=? WHERE id_workout=?";

    db.query(query, [req.body.Name, req.body.Date, workoutId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error when updating" })
      }
      else {
        return res.json({ Success: "Workout edited" })
      }
    })
  }
  )

  return router;
};

export default createRoutes;