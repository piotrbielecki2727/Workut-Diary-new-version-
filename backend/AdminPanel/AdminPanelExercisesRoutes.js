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
                        throw new Error("There is an error");
                    }
                    return res.json({ Success: "Data successfully fetched", result })
                })
            }
            catch (error) {
                return res.json({ Error: "Error fetching data.", error })
            }
        }
    }


    const exercisesController = new AdminPanelExercisesController(db);


    router.get("/getExercisesList", (req, res) => {
        exercisesController.getExercisesList(req, res);
    })

    return router;
}

export default createRoutes;
