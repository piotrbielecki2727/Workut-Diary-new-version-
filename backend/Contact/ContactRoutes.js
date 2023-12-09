import express from 'express';
const router = express.Router();
import queries from './queries.js';


const createRoutes = (db) => {

    class ContactController {

        constructor(db) {
            this.db = db;
        }

        createNewMessage(req, res) {
            console.log(req.body.userId);
            try {
                this.db.query(
                    queries.createNewMessage,
                    [req.body.userId, req.body.subject, req.body.messageType, req.body.message],
                    (error, result) => {
                        if (error) {
                            console.log(error);
                            return res.json({ Error: "There is an error." });
                        }

                        return res.json({ Success: "Successfully created new message." });
                    }
                );
            } catch (error) {
                console.log(error);
                return res.json({ Error: "There is an error." });
            }
        }

    }
    const contactController = new ContactController(db);

    router.post("/createNewMessage", (req, res) => {
        contactController.createNewMessage(req, res);
    })

    return router;
};


export default createRoutes;