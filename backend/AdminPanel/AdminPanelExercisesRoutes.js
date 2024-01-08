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

        getChoosedExerciseInformation(req, res) {
            const idToEdit = req.params.idToEdit;
            try {
                this.db.query(queries.getChoosedExerciseInformationQuery, [idToEdit], (err, result) => {
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
            console.log("xdd", req.body.IdMainMuscleGroup);
            try {
                this.db.query(
                    queries.createNewExercise,
                    [req.body.ExerciseName, req.body.SecondaryMuscleGroup1, 
                    req.body.SecondaryMuscleGroup2, req.body.GifLink,
                    req.body.Description, req.body.LinkToYTVideo, req.body.Difficulty, 
                    req.body.Equipment, req.body.IdMainMuscleGroup],
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

        deleteExerciseFromDB(req, res) {
            const idToDelete = req.params.idToDelete;
            try {
                this.db.query(
                    queries.deleteExerciseFromDB,
                    [idToDelete],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return res.json({ Error: "There is an error." });
                        }

                        return res.json({ Success: "Successfully deleted exercise from db." });
                    }
                );
            } catch (error) {
                console.log(error);
                return res.json({ Error: "There is an error." });
            }
        }


        editChoosedExerciseInDB(req, res) {
            console.log("xdd", req.body.values);
            try {
                this.db.query(
                    queries.editChoosedExerciseInDB,
                    [req.body.ExerciseName, req.body.SecondaryMuscleGroup1, 
                    req.body.SecondaryMuscleGroup2, req.body.GifLink,
                    req.body.Description, req.body.LinkToYTVideo, 
                    req.body.Difficulty, req.body.Equipment, req.body.IdMainMuscleGroup, req.body.id_exercise],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return res.json({ Error: "There is an error." });
                        }

                        return res.json({ Success: "Successfully edited exercise." });
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

    router.get("/getChoosedExerciseInformation/:idToEdit", (req, res) => {
        exercisesController.getChoosedExerciseInformation(req, res);
    })

    router.put("/editChoosedExerciseInDB", (req, res) => {
        exercisesController.editChoosedExerciseInDB(req, res);
    })


    router.post("/createNewExercise", (req, res) => {
        exercisesController.createNewExercise(req, res);
    })

    router.delete("/deleteExerciseFromDB/:idToDelete", (req, res) => {
        exercisesController.deleteExerciseFromDB(req, res);
    })



    return router;
}


export default createRoutes;
