import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import Home from "./Components/Home";
import User from "./Components/User";
import Login from "./Components/Login_Registration/Login";
import NavigateBar from "./Components/Navigation/NavigateBar";
import WorkoutsHistory from "./Components/WorkoutsHistory/WorkoutsHistory";
import WorkoutManager from "./Components/Workouts/WorkoutManager";
import Exercises from "./Components/Exercises/Exercises";
import AllExercises from "./Components/Exercises/AllExercises";
import ChoosedExercise from "./Components/Exercises/ChoosedExercise";
import Pagination from "./Components/Exercises/Pagination";
import Cookies from 'js-cookie';
import WorkoutPlanner from "./Components/WorkoutPlanning/WorkoutPlanner";
import { UserIdProvider } from './Components/UserIdContext';
import { AuthProvider } from "./Components/AuthContext";
import LastWorkout from "./Components/Workouts/LastWorkout";
import StartWorkout from "./Components/WorkoutPlanning/StartWorkout";




function AppWrapper() {


  const checkToken = (element) => {
    const token = Cookies.get("token");
    return token ? element : <Navigate to="/" />;
  };

  return (
    <AuthProvider>
      <UserIdProvider>

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
                path="/getExercise/:Name"
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
                  <Pagination />
                }
              />
              <Route
                path="/workoutManager"
                element={
                  checkToken(<WorkoutManager />)
                }
              />

              <Route
                path="/workoutPlanner/:workoutId"
                element={
                  checkToken(<WorkoutPlanner />)
                }
              />

              <Route
                path="/lastWorkout/:DoneWorkoutId/:workoutName/:workoutDate"
                element={
                  checkToken(<LastWorkout />)
                }
              />

              <Route
                path="/WorkoutsHistory"
                element={
                  checkToken(<WorkoutsHistory />)
                }
              />

              <Route
                path="/StartedWorkout"
                element={
                  checkToken(<StartWorkout />)
                }
              />





              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div>Page not found!</div>} />
            </Routes>
          </div>
        </div>
      </UserIdProvider>
    </AuthProvider>
  );
}

ReactDOM.render(
  <Router>
    <AppWrapper />
  </Router>,
  document.getElementById("root")
);
