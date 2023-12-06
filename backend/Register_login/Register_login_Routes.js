import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";


const createRoutes = (db) => {


  const salt = 10;

  router.use(cookieParser());

  const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ Error: "You are not authenticated" });
    }
    else {
      jwt.verify(token, "jwt-security-key", (err, decoded) => {
        if (err) {
          return res.json({ Error: "Token is not right" });
        }
        else {
          req.userId = decoded.userId;
          req.name = decoded.name;
          next();
        }
      })
    }
  }

  router.get('/', verifyUser, (req, res) => {
    const userId = req.userId;
    const query = 'SELECT id_user,first_name, role FROM users WHERE id_user = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "Error" });
      }

      if (results.length === 0) {
        return res.json({ Error: "User not found!" });
      }

      const firstName = results[0].first_name;
      const idUser = results[0].id_user;
      const role = results[0].role;

      return res.json({ Status: "Success", firstName: firstName, idUser: idUser, role: role });
    });
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('userId');
    return res.json({ Status: "Success" })
  })


  router.post('/registerUser', (req, res) => {
    console.log(req.body);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const query = "SELECT * FROM users WHERE email = (?)";
    const sql = "INSERT INTO USERS (`first_name`, `email`, `password`, `role`, `status`, `last_logged_in`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error hashing password" });
      const values = [
        req.body.first_name,
        req.body.email,
        hash,
        req.body.role,
        req.body.status,
        req.body.last_logged_in
      ]



      db.query(query, [req.body.email], (err, result) => {
        if (result.length > 0) {
          return res.json({ Error: "This email address is already registered" });
        }
        else if (!emailRegex.test(req.body.email)) {
          return res.json({ Error: "Missing @ in the email address" });
        }
        else if (!req.body.email || !req.body.password || !req.body.first_name) {
          return res.json({ Error: "Please fill in all required fields." });
        }
        else {
          db.query(sql, [values], (err, result) => {
            if (err) {
              console.log(err);
              return res.json({ Error: "Error inserting data to database", err });
            }
            else {
              return res.json({ Status: "Success" });
            }
          });
        }
      });
    });
  });

  router.post('/loginUser', (req, res) => {
    console.log(req.body);
    const sql = 'SELECT * FROM users WHERE Email = ? ';
    db.query(sql, [req.body.email], (err, data) => {
      if (err) return res.json({ Error: "An error occurred while logging in." });
      if (data.length > 0) {
        bcrypt.compare(req.body.password.toString(), data[0].Password, (err, response) => {
          if (err) return res.json({ Error: "A password compare error occurred." });
          if (response) {
            const userId = data[0].id_user;
            const name = data[0].name;
            const token = jwt.sign({ userId, name }, "jwt-security-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" });
          }
          else {
            return res.json({ Error: "Wrong password!" });
          }
        })

      }
      else {
        return res.json({ Error: "This email don't exist." });
      }
    })
  })

  router.post('/updateHour', (req, res) => {
    console.log('updatuje');
    const sql = 'UPDATE USERS SET last_logged_in = ? where email=?';
    db.query(sql, [req.body.last_logged_in, req.body.email], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "An error occurred while updating last logged hour." });
      }
      return res.json({ Success: "Updated" })

    })
  });


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //pobieranie konkretnego usera

  router.get('/getUser/:userId', verifyUser, (req, res) => {
    const userId = req.userId;

    const query = 'SELECT first_name,email,role FROM users WHERE id = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.log(error);
        return res.json({ Error: "Wystąpił błąd" });
      }

      if (results.length === 0) {
        return res.json({ Error: "Nie znaleziono użytkownika" });
      }

      const firstName = results[0].first_name;
      const email = results[0].email;
      const role = results[0].role;

      return res.json({ Status: "Success", firstName: firstName, email: email, role: role });
    });
  });




  return router;
};

export default createRoutes;