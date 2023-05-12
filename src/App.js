import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./components/Login/login";
import SignUpPage from "./components/Signup/signUp";
import PollList from "./components/PollList/pollList";
import AddPoll from "./components/AddPoll/addPoll";
import { userDetailsFromLocalStorage } from "./redux/login/actions/login";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userDetails) {
      dispatch(userDetailsFromLocalStorage(userDetails));
      const path = location.pathname;
      if (path === "/pollList") navigate("/pollList");
      else if (path === "/addPoll") navigate("/addPoll");

    }
  }, [navigate, dispatch]);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/pollList" element={<PollList />} />
        <Route exact path="/addPoll" element={<AddPoll />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
