import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
import Pagination from "./Components/Exercises/Pagination";
import Cookies from 'js-cookie';
import WorkoutPlanner from "./Components/WorkoutPlanning/WorkoutPlanner";
import { UserIdProvider } from './Components/UserIdContext';
import { AuthProvider } from "./Components/AuthContext";




function AppWrapper() {


  const checkToken = (element) => {
    const token = Cookies.get("token");
    console.log(token);
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
                path="/userProfile"
                element={
                  <UserProfile />
                }
              />
              <Route
                path="/workoutManager"
                element={
                  checkToken(<WorkoutManager />)
                }
              />

              <Route
                path="/workoutPlanner"
                element={
                  checkToken(<WorkoutPlanner />)
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
