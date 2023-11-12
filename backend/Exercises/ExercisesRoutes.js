import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

  //POBIERA WSZYSTKIE CWICZENIA W BAZIE
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

  //FILTR DO KART (PO GRUPIE MIESNIOWEJ)


  router.get('/getExerciseByMuscleGroup/:muscle_group', (req, res) => {
    const muscle_group = req.params.muscle_group;

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


  //POBIERA INFORMACJE O WYBRANYM CWICZENIU


  router.get('/getChoosedExercise/:Name', (req, res) => {
    const Name = req.params.Name;
    const query = 'SELECT id_exercise,Name,gif,main_muscle_group,muscle_group_1,muscle_group_2,equipment,difficulty,video,description from exercises where Name = ? ';
    db.query(query, [Name], (error, results) => {
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


  //POBIERA WYSZUKIWANE CWICZENIA

  router.get('/getSearch/:search', (req, res) => {
    const search = req.params.search;

    const query = `SELECT * FROM exercises WHERE Name LIKE '%${search}%'`;
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

  router.get('/getMuscleGroups', (req, res) => {
    const query = 'SELECT muscle_group, img_src from muscle_groups';
    db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "There is error" });
      }
  
      if (results.length === 0) {
        return res.json({ Error: "Can't find muscle_group " });
      }
  
      return res.json({ Status: "Success", results });
    });
  });





  return router;
};

export default createRoutes;