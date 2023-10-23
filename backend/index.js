import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import ExercisesRoutes from "./Exercises/ExercisesRoutes.js";
import WorkoutsRoutes from "./Workouts/WorkoutsRoutes.js"

const salt = 10;

const app = express();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "HYPE",
});

app.use(express.json());


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));




app.use(cookieParser())

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
        req.userId = decoded.userId; // Dodajemy pobrane userId do req
        req.name = decoded.name;
        next();
      }
    })
  }
}

app.get('/', verifyUser, (req, res) => {
  const userId = req.userId;
  const query = 'SELECT id_user,first_name FROM users WHERE id_user = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.log(error);
      return res.json({ Error: "Wystąpił błąd" });
    }

    if (results.length === 0) {
      return res.json({ Error: "Nie znaleziono użytkownika" });
    }

    const firstName = results[0].first_name;
    const idUser = results[0].id_user;

    return res.json({ Status: "Success", name: req.name, firstName: firstName, idUser: idUser });
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('userId');
  return res.json({ Status: "Success" })
})


app.post('/registerUser', (req, res) => {
  console.log(req.body);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const query = "SELECT * FROM users WHERE email = (?)";
  const sql = "INSERT INTO USERS (`first_name`, `email`, `password`, `role`, `level`, `Weight`, `Height`, `avatar`, `status`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const values = [
      req.body.first_name,
      req.body.email,
      hash,
      req.body.role,
      req.body.level,
      req.body.weight,
      req.body.height,
      req.body.avatar,
      req.body.status,
    ]

    db.query(query, [req.body.email], (err, result) => {
      if (result.length > 0) {
        return res.json({ Error: "Taki mail już istnieje" });
      }
      if (!emailRegex.test(req.body.email)) {
        return res.json({ Error: "Brak @ w adresie e-mail" });
      }

      else {
        db.query(sql, [values], (err, result) => {
          if (err) return res.json({ Error: "Error inserting data to database" });
          else {
            return res.json({ Status: "Success" });
          }
        });
      }
    });
  });
});

app.post('/loginUser', (req, res) => {
  console.log(req.body);
  const sql = 'SELECT * FROM users WHERE Email = ? ';
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    console.log("Data from database:", data); // Add this line

    if (data.length > 0) {
      console.log("Stored hashed password:", data[0].Password); // Add this line
      bcrypt.compare(req.body.password.toString(), data[0].Password, (err, response) => {
        if (err) return res.json({ Error: "Password compare error" });
        if (response) {
          const userId = data[0].id_user; // Pobieramy userId z danych użytkownika
          const name = data[0].name;
          const token = jwt.sign({ userId, name }, "jwt-security-key", { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success" });
        }
        else {
          return res.json({ Error: "Password not matched" });
        }
      })

    }
    else {
      return res.json({ Error: "No email existed" });
    }
  })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//pobieranie konkretnego usera

app.get('/getUser/:userId', verifyUser, (req, res) => {
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


app.get('/getMuscleGroups', (req, res) => {
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



app.use('/', ExercisesRoutes(db));
app.use('/', WorkoutsRoutes(db));
















app.listen(3001, () => {
  console.log("BACKEND IS RUNNING!");
});
