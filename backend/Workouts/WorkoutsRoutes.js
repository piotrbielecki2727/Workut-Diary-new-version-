import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

  router.post('/createWorkout', (req, res) => {
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



  router.delete('/deleteWorkout/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId;
    console.log("id workouto do usuniecia w backendzie to:" + workoutId)
    const query = "DELETE FROM WORKOUTS WHERE id_workout = ?";

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


  router.get('/getWorkouts/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT id_workout,Name,Date from workouts where Users_id_user = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error get data" })
      }
      else {
        return res.json({ Success: "Success", result });
      }
    })
  })
  

  router.get('/getWorkout/:workoutId', (req, res) => {
    const workoutId = req.params.workoutId;
    const query = "SELECT id_workout,Name,Date from workouts where id_workout = ?";
    db.query(query, [workoutId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error get data" })
      }
      else {
        return res.json({ Success: "Success", result });
      }
    })
  })


  router.get(`/getWorkoutExercises/:workoutId`, (req, res) => { 
    const workoutId = req.params.workoutId;
    const query = "SELECT workout_exercise.Exercise_id, exercises.Name, exercises.gif from workout_exercise, exercises where workout_exercise.Exercise_id=exercises.id_exercise and workout_id = ? ORDER BY `ORDER`";
    db.query(query, [workoutId], (err, result) => {
      if (err) {
        return res.json({ Error: "Error when getWorkoutExercises" })
      }
      if (result.length === 0) {
        return res.json({ Error: "Can't find exercises " });
      }
      else {
        return res.json({ Success: "Success", result })
      }
    })
  })


  router.delete(`/deleteExerciseFromWorkout/:workoutId/:exerciseId`, (req, res) => {
    const workoutId = req.params.workoutId;
    const exerciseId = req.params.exerciseId;
    const query = "DELETE FROM WORKOUT_EXERCISE WHERE (`Workout_id`,`Exercise_id`) =(?,?)";
    db.query(query, [workoutId, exerciseId], (err) => {
      if (err) {
        return res.json({ Error: "Error when delete exercise from workout" })
      }
      return res.json({ Success: "Success" });
    })
  })

  router.post('/addExerciseToChosenWorkout', (req, res) => {
    const workoutId = req.body.workoutId;
    const exerciseId = req.body.ChoosedExerciseId;


    const query = "INSERT INTO WORKOUT_EXERCISE (`Workout_id`, `Exercise_id`) VALUES (?, ?)";

    db.query(query, [workoutId, exerciseId], (error, result) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ Error: "Duplicate entry" });
        } else {
          console.error(error);
          return res.status(500).json({ Error: "Internal Server Error" });
        }
      }

      return res.json({ Success: "Exercise added to workout" });
    });
  })



  router.post('/updateExerciseOrder', (req, res) => {
    const updatedExercises = req.body.updatedExercises;

    const queries = updatedExercises.map(exercise => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE workout_exercise SET \`Order\` = ? WHERE Exercise_id = ?`;

        db.query(query, [exercise.Order, exercise.Exercise_id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });

    Promise.all(queries)
      .then(results => {
        res.json({ Success: true });
      })
      .catch(error => {
        console.error('Błąd podczas aktualizowania kolejności ćwiczeń:', error);
        res.json({ Success: false, Error: error.message });
      });
  });



















  return router;
};

export default createRoutes;