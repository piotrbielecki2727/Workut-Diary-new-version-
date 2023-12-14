import express from 'express';
const router = express.Router();

const createRoutes = (db) => {



  router.get(`/getHighestOrderValue`, (req, res) => {
    const workoutId = req.query.workoutId;
    console.log("workoutid", workoutId);
    const query = `SELECT MAX(TRAINING_EXERCISE.ORDER) as max_order FROM TRAINING_EXERCISE
    where workout_id=?`
    db.query(query, [workoutId], (error, result) => {
      if (error) {
        return res.json({ Error: "Error when get order" })
      }

      const max_order = result[0].max_order;

      return res.json({ Success: "Success", max_order: max_order });
    })
  }
  )



  router.post('/addExerciseToChosenWorkout', (req, res) => {
    const workoutId = req.body.workoutId;
    const exerciseId = req.body.ChoosedExerciseId;
    const order = req.body.order;
    console.log(order);
    console.log(workoutId)
    console.log(exerciseId)

    const query1 = `SELECT Workout_id, Exercise_id from Training_Exercise where Workout_id=? and Exercise_id=? `;
    const query2 = "INSERT INTO Training_Exercise (`Workout_id`, `Exercise_id`, `Order`) VALUES (?, ?, ?)";

    db.query(query1, [workoutId, exerciseId], (error, result) => {
      if (result.length > 0) {
        return res.json({ Error: "Exercise exist" });
      }
      else {
        db.query(query2, [workoutId, exerciseId, order], (error, result) => {
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
      }
    })
  })




  router.get(`/getWorkoutExercises/:workoutId`, (req, res) => {
    const workoutId = req.params.workoutId;
    const query =
      `SELECT Training_Exercise.Exercise_id, Exercises.Name, Exercises.gif 
    from Training_Exercise, Exercises 
    where Training_Exercise.Exercise_id=Exercises.id_exercise 
    and 
    Training_Exercise.Workout_id = (?) 
    ORDER BY "ORDER"`;
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
    const query = "DELETE FROM Training_Exercise WHERE (`Workout_id`,`Exercise_id`) =(?,?)";
    db.query(query, [workoutId, exerciseId], (err) => {
      if (err) {
        return res.json({ Error: "Error when delete exercise from workout" })
      }
      return res.json({ Success: "Success" });
    })
  })





  router.post('/updateExerciseOrder', (req, res) => {
    const updatedExercises = req.body.updatedExercises;

    const queries = updatedExercises.map(exercise => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE Training_Exercise SET \`Order\` = ? WHERE Exercise_id = ?`;

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





  router.post('/saveAllSets', (req, res) => {
    const { sets } = req.body;
    const workoutId = req.body.workoutId;
    console.log(sets);

    const values = sets.map(set => [
      set.Exercise_id,
      set.Repetitions,
      set.Weight,
      set.maxrep,
      set.rest
    ]);

    const date = new Date();
    date.setHours(date.getHours() + 1);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');


    const query1 = 'INSERT INTO Done_trainings ( Training_Groups_id_group, date ) VALUES (?, ?)';
    db.query(query1, [workoutId, formattedDate], (error, result) => {
      if (error) {
        console.error('Error saving done_workouts:', error);
        return res.status(500).json({ error: 'Error saving done_workouts' });
      }

      const lastInsertIdQuery = 'SELECT LAST_INSERT_ID() as lastId';
      db.query(lastInsertIdQuery, (error, result) => {
        if (error) {
          console.error('Error retrieving last insert ID:', error);
          return res.status(500).json({ error: 'Error retrieving last insert ID' });
        }

        const lastInsertedId = result[0].lastId;

        if (!sets || !Array.isArray(sets)) {
          return res.status(400).json({ error: 'Invalid request body' });
        }

        const query2 = 'INSERT INTO sets (Exercise_id, Repetitions, Weight, 1RM, rest,  Done_Trainings_id_done_training) VALUES ?';

        values.forEach(value => {
          value.push(lastInsertedId);
        });


        db.query(query2, [values], (error, results) => {
          if (error) {
            console.error('Error saving workout sets:', error);
            return res.status(500).json({ error: 'Error saving workout sets' });
          }
          return res.status(200).json({ success: 'Successfully saved sets' });


        });
      })
    })
  });



  router.get("/getDoneWorkoutDetails/:DoneWorkoutId", (req, res) => {
    const DoneWorkoutId = req.params.DoneWorkoutId;
    console.log(DoneWorkoutId);
    const query = `SELECT sets.*, exercises.gif, exercises.name, training_exercise.Order
    FROM sets, done_trainings, exercises, training_exercise
    WHERE done_trainings.id_done_training = sets.Done_Trainings_id_done_training
    and done_trainings.Training_Groups_id_group = training_exercise.Workout_id 
    AND exercises.id_exercise = sets.Exercise_id
    and training_exercise.Exercise_id=exercises.id_exercise
    AND done_trainings.id_done_training=?
    order by training_exercise.Order;`;

    db.query(query, [DoneWorkoutId], (error, result) => {
      if (error) {
        return res.json({ Error: "Error when getting sets" });
      }

      const processedResult = {};
      result.forEach((row) => {
        const exerciseId = row.Exercise_id;

        if (!processedResult[exerciseId]) {
          processedResult[exerciseId] = {
            gif: row.gif,
            name: row.name,
            order: row.Order,
            sets: [],
          };
        }

        processedResult[exerciseId].sets.push({
          set_id: row.id_set,
          set_reps: row.Repetitions,
          set_weight: row.weight,
          set_max: row[`1rm`],
          set_rest: row.rest
        });
      });
      

      const finalResult = Object.values(processedResult)
      .sort((a, b) => a.order - b.order);

      return res.json({ Success: "Success", result: finalResult });
    });
  });























  return router;
};

export default createRoutes;