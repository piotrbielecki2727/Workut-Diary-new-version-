import express from 'express';
const router = express.Router();

const createRoutes = (db) => {


  router.get('/getAllExercises', (req, res) => {
    const query = 'SELECT id_exercise,Name,gif from exercises';
    db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "There is error" });
      }

      if (results.length === 0) {
        return res.json({ Error: "Can't find exercises " });
      }

      return res.json({ Status: "Success", results });
    });
  });

  router.get('/getExerciseByMuscleGroup/:muscle_group', (req, res) => {
    const muscle_group = req.params.muscle_group; // Popraw pobieranie parametru
    console.log(muscle_group);
    const query = 'SELECT id_exercise,Name,gif,main_muscle_group from exercises where main_muscle_group = ? ';
    db.query(query, [muscle_group], (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "There is error" });
      }

      if (results.length === 0) {
        return res.json({ Error: "Can't find exercises " });
      }

      return res.json({ Status: "Success", results });
    });
  });


  router.get('/getChoosedExercise/:id_exercise', (req, res) => {
    const id_exercise = req.params.id_exercise; // Popraw pobieranie parametru
    console.log(id_exercise);
    const query = 'SELECT Name,gif,main_muscle_group,muscle_group_1,muscle_group_2,equipment,difficulty,video,description from exercises where id_exercise = ? ';
    db.query(query, [id_exercise], (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "There is error" });
      }

      if (results.length === 0) {
        return res.json({ Error: "Can't find exercises " });
      }

      return res.json({ Status: "Success", results });
    });
  });



  return router;
};

export default createRoutes;