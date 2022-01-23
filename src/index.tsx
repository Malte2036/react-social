import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import WelcomePage from "./routes/welcome/WelcomePage";
import Database from "./database/database";

const database = new Database("http://192.168.179.115/v1", "react-test");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<WelcomePage database={database} />}
        ></Route>
        <Route
          path="/home"
          element={<HomePage database={database}></HomePage>}
        ></Route>
        <Route path="/" element={<Navigate to="/home" />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
