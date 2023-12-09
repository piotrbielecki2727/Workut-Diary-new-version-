import express from 'express';
const router = express.Router();
import queries from './queries.js';
const createRoutes = (db) => {


    class AdminPanelUsersController {

        constructor(db) {
            this.db = db;
        }

        getUsersList(req, res) {
            try {
                this.db.query(queries.getUsersListQuery, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ Error: "There is an error." });
                    }

                    return res.json({ Success: "Data successfully fetched.", result })
                })
            }
            catch (error) {
                return res.json({ Error: "Error message", error })
            }
        }

        updateUserStatus(req, res) {
            console.log(req.body.status);
            console.log(req.body.userId);

            try {
                this.db.query(queries.updateUserStatus, [req.body.status, req.body.userId], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ Error: "There is an error." });
                    }
                    return res.json({ Success: "User successfully blocked." })
                })
            }
            catch (error) {
                return res.json({ Error: "Error when blocking user", error })
            }
        }


    }

    const usersController = new AdminPanelUsersController(db);

    router.get("/getUsersList", (req, res) => {
        usersController.getUsersList(req, res)
    });

    router.post("/updateUserStatus", (req, res) => {
        usersController.updateUserStatus(req, res)
    });


    return router;
};

export default createRoutes;