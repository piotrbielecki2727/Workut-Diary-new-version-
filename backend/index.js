import express from "express";
import mysql from "mysql2";
import cors from "cors";


import ExercisesRoutes from "./Exercises/ExercisesRoutes.js";
import AddingSetsRoutes from "./Workouts/AddingSetsRoutes.js";
import CreatingWorkoutRoutes from "./Workouts/CreatingWorkoutRoutes.js";
import Register_login_Routes from "./Register_login/Register_login_Routes.js";
import WorkoutHistoryRoutes from "./Workouts/WorkoutHistoryRoutes.js";
import YourProfileRoutes from  "./YourProfile/YourProfileRoutes.js";
import AdminRoutes from  "./AdminPanel/AdminRoutes.js";



const app = express();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "HYPEE",
});

app.use(express.json());


app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));



app.use('/', ExercisesRoutes(db));
app.use('/', AddingSetsRoutes(db));
app.use('/', CreatingWorkoutRoutes(db));
app.use('/', Register_login_Routes(db));
app.use('/', WorkoutHistoryRoutes(db));
app.use('/', YourProfileRoutes(db));
app.use('/', AdminRoutes(db));















app.listen(3001, () => {
  console.log("BACKEND IS RUNNING!");
});
