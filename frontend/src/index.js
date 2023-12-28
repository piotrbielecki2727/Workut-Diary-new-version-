import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'


import "./index.css";
import Home from "./Components/HomePage/Home";
import Login from "./Components/Login_Registration/Login";
import NavigateBar from "./Components/Navigation/NavigateBar";
import WorkoutsHistory from "./Components/WorkoutsHistory/WorkoutsHistory";
import WorkoutManager from "./Components/Workouts/WorkoutManager";
import Exercises from "./Components/Exercises/Exercises";
import AllExercises from "./Components/Exercises/AllExercises";
import ChoosedExercise from "./Components/Exercises/ChoosedExercise";
import Cookies from 'js-cookie';
import WorkoutPlanner from "./Components/WorkoutPlanning/WorkoutPlanner";
import { UserIdProvider, useUserId } from './Components/UserIdContext';
import { AuthProvider } from "./Components/AuthContext";
import { RoleProvider } from "./Components/RoleContext";

import { useRole } from "./Components/RoleContext";

import LastWorkout from "./Components/Workouts/LastWorkout";
import StartWorkout from "./Components/WorkoutPlanning/StartWorkout";
import CheckDetails from "./Components/WorkoutsHistory/CheckDetails"
import YourProfile from "./Components/YourProfile/YourProfile";
import BmrCalculator from "./Components/BmrCalculator/BmrCalculator";
import Introduction from "./Components/Introduction/Introduction";
import UsersManagment from "./Components/AdminPanel/Users/UsersManagment";
import ExercisesManagment from "./Components/AdminPanel/Exercises/ExercisesManagment";
import ManageUserMessages from "./Components/AdminPanel/UserMessages/ManageUserMessages";
import Contact from "./Components/Contact/Contact";

function AppWrapper() {


  const { role } = useRole();


  const checkPermissions = (element, requiredRoles) => {
    if (role && requiredRoles && requiredRoles.includes(role)) {
      console.log("istnieje:", role);
      return element;
    } else {
      return <Navigate to="/" />;
    }
  };



  return (

    <AuthProvider>

      <UserIdProvider>
        <ChakraProvider>
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
                  path="/BmrCalculator"
                  element={
                    <BmrCalculator />
                  }
                />

                <Route
                  path="/introduction"
                  element={
                    <Introduction />
                  }
                />


                <Route
                  path="/exercises"
                  element={
                    <Exercises />
                  }
                />
                <Route
                  path="/manageUsers"
                  element={checkPermissions(<UsersManagment />, ["Admin"])}
                />

                <Route
                  path="/manageExercises"
                  element={checkPermissions(<ExercisesManagment />, ["Admin"])}
                />

                <Route
                  path="/messages"
                  element={checkPermissions(<ManageUserMessages />, ["Admin"])}
                />

                <Route
                  path="/contact"
                  element={checkPermissions(<Contact />, ["User"])}
                />




                <Route
                  path="/getExercises/:muscle_group"
                  element={<AllExercises />}
                />

                <Route
                  path="/getExercise/:main_muscle_group/:Name"
                  element={<ChoosedExercise />}
                />

                <Route
                  path="/YourProfile"
                  element={checkPermissions(<YourProfile />, ["User"])}
                />

                <Route
                  path="/workoutManager"
                  element={checkPermissions(<WorkoutManager />, ["User"])}
                />

                <Route
                  path="/workoutPlanner/:workoutId"
                  element={checkPermissions(<WorkoutPlanner />, ["User"])}
                />

                <Route
                  path="/lastWorkout/:DoneWorkoutId/:workoutName/:workoutDate"
                  element={checkPermissions(<LastWorkout />, ["User"])}
                />

                <Route
                  path="/WorkoutsHistory"
                  element={checkPermissions(<WorkoutsHistory />, ["User"])}
                />

                <Route
                  path="/StartedWorkout"
                  element={checkPermissions(<StartWorkout />, ["User"])}
                />

                <Route
                  path="/checkDetails/:id_done_training/:workoutName/:workoutDate"
                  element={checkPermissions(<CheckDetails />, ["User"])}
                />

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div>Page not found!</div>} />
              </Routes>
            </div>
          </div>

        </ChakraProvider>
      </UserIdProvider>

    </AuthProvider>
  );
}

ReactDOM.render(
  <Router>
    <RoleProvider>


      <AppWrapper />

    </RoleProvider>
  </Router>,
  document.getElementById("root")
);
