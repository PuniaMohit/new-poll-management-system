import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./components/Login/login";
import SignUpPage from "./components/Signup/signUp";
import PollList from "./components/PollList/pollList";
import AddEditPoll from "./components/AddEditPoll/addEditPoll";
import { userDetailsFromLocalStorage } from "./redux/login/actions/login";
import SinglePollPage from "./components/SinglePoll/singlePoll";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userDetails) {
      dispatch(userDetailsFromLocalStorage(userDetails));
      const path = location.pathname;
      if (path === "/") navigate("/pollList");
    }
  }, [navigate, dispatch]);
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/pollList" element={<PollList />} />
      <Route
        path="/poll/:mode/:pollId"
        element={<AddEditPoll />}
      />
      <Route exact path="/singlePoll/:pollId" element={<SinglePollPage />} />
      <Route exact path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
