import express from 'express';
const router = express.Router();
import queries from './queries.js';
const createRoutes = (db) => {

    class ChartsController {

        constructor(db) {
            this.db = db;
        }

        getExercisesForCharts(req, res) {
            const userId = req.params.userId;
            try {
                this.db.query(queries.getExercisesForCharts, [userId], (err, result) => {
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

        getChartData(req, res) {
            const userId = req.params.userId;
            const choosedExercise = req.params.choosedExercise;
            console.log(choosedExercise, userId);
            try {
                this.db.query(queries.getChartData, [choosedExercise, userId], (err, result) => {
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



    }

    const chartsController = new ChartsController(db);


    router.get("/getExercisesForCharts/:userId", (req, res) => {
        chartsController.getExercisesForCharts(req, res);
    })

    router.get("/getChartData/:choosedExercise/:userId", (req, res) => {
        chartsController.getChartData(req, res);
    })




    return router;
}


export default createRoutes;
