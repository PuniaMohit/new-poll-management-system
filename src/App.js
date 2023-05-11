import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import LoginPage from "./components/Login/login";


function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;
