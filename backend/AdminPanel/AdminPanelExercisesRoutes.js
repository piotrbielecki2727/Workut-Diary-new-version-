import express from 'express';
const router = express.Router();
import queries from './queries.js';
const createRoutes = (db) => {

    class AdminPanelExercisesController {

        constructor(db) {
            this.db = db;
        }

        getExercisesList(req, res) {
            try {
                this.db.query(queries.getExercisesListQuery, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ Error: "There is an error." });
                    }
                    return res.json({ Success: "Data successfully fetched", result })
                })
            }
            catch (error) {
                return res.json({ Error: "Error fetching data.", error })
            }
        }


        createNewExercise(req, res) {
            console.log("xdd", req.body.values);
            try {
                this.db.query(
                    queries.createNewExercise,
                    [req.body.ExerciseName, req.body.MainMuscleGroup, req.body.SecondaryMuscleGroup1, req.body.SecondaryMuscleGroup2, req.body.GifLink, req.body.Description, req.body.LinkToYTVideo, req.body.Difficulty, req.body.Equipment],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return res.json({ Error: "There is an error." });
                        }

                        return res.json({ Success: "Successfully created new exercise." });
                    }
                );
            } catch (error) {
                console.log(error);
                return res.json({ Error: "There is an error." });
            }
        }

    }

    const exercisesController = new AdminPanelExercisesController(db);


    router.get("/getExercisesList", (req, res) => {
        exercisesController.getExercisesList(req, res);
    })

    router.post("/createNewExercise", (req, res) => {
        exercisesController.createNewExercise(req, res);
    })


    return router;
}


export default createRoutes;
