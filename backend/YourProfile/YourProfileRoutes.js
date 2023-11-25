import express from 'express';
const router = express.Router();

const createRoutes = (db) => {

  router.post("/saveMeasurements", (req, res) => {
    const formData = req.body.formData;

    console.log(formData);
    const query = `INSERT INTO user_measurements SET ?`;



    db.query(query, [formData], (err, result) => {
      if (err) {
        console.error("Error while executing the query:", err);
        return res.json({ Error: "There is an error." });
      } else {
        console.log("Query executed successfully:", result);
        return res.json({ Success: "Insert success." });
      }
    });
  });


  router.get("/getMeasurements/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const query = `select * from user_measurements where id_user=? ORDER BY date DESC LIMIT 1`;

    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.json({ Error: "There is an error." });
      } else {
        return res.json({ Success: "Data successfully fetched.", result });
      }
    });
  });

  router.get("/getUserDetails/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const query = `select email, first_name from users where id_user=?`

    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.json({ Error: "There is an error." });
      } else {
        return res.json({ Success: "Data successfully fetched.", result });
      }
    });
  });

  router.get("/getAllBodyMeasurements/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const query = `select * from user_measurements where id_user=?`

    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.json({ Error: "There is an error." });
      } else {
        return res.json({ Success: "Data successfully fetched.", result });
      }
    });
  });

  router.delete('/deleteMeasurementFromDB/:deleteId', (req, res) => {
    const deleteId = req.params.deleteId;
    const query = "DELETE FROM user_measurements WHERE id_measurement = ?";

    db.query(query, [deleteId], (err, result) => {
        if (err) {
            return res.json({ Error: "Error when deleting" })
        }
        return res.json({ Success: "Measurement deleted" })
    })
}
)
  




  return router;
};

export default createRoutes;