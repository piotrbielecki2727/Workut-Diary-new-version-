import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";

import "./index.css";
import App from "./App";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import User from "./Components/User";
import Login from "./Components/Login_Registration/Login";
import NavigateBar from "./Components/Navigation/NavigateBar";
import UserProfile from "./Components/Profile/UserProfile";
import WorkoutManager from "./Components/Workouts/WorkoutManager";
import Exercises from "./Components/Exercises/Exercises";
import AllExercises from "./Components/Exercises/AllExercises";
import ChoosedExercise from "./Components/Exercises/ChoosedExercise";


function AppWrapper() {



  return (
    <div >
      <NavigateBar />
      <div id="allBackgrounds">
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/exercises"
            element={
              <Exercises />
            }
          />

          <Route
            path="/getExercises/:muscle_group"
            element={<AllExercises />}
          />

          <Route
            path="/getExercise/:id_exercise"
            element={<ChoosedExercise />}
          />

          <Route
            path="/user"
            element={
              <User />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin />
            }
          />

          <Route
            path="/userProfile/:token"
            element={
              <UserProfile />
            }
          />
          <Route
            path="/workoutManager/:token"
            element={
              <WorkoutManager />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Page not found!</div>} />
        </Routes>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <AppWrapper />
  </Router>,
  document.getElementById("root")
);
