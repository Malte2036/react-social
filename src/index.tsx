import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import WelcomePage from "./routes/welcome/WelcomePage";
import AppwriteService from "./database/appwriteService";
import UserPage from "./routes/user/UserPage";
import ErrorPage from "./routes/error/ErrorPage";

const appwriteService = new AppwriteService(
  process.env.REACT_APP_APPWRITE_URL!,
  process.env.REACT_APP_APPWRITE_PROJECT_ID!,
  process.env.REACT_APP_APPWRITE_POSTS_COLLECTION_ID!,
  process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID!
);

/*if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {*/
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.add("bg-slate-900");
} else {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("bg-gray-200");
}

ReactDOM.render(
  <React.StrictMode>
    <div className="min-h-screen dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<WelcomePage appwriteService={appwriteService} />}
          />
          <Route
            path="/home"
            element={<HomePage appwriteService={appwriteService} />}
          />
          <Route
            path="/user/:userId"
            element={<UserPage appwriteService={appwriteService} />}
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="*"
            element={<ErrorPage code={404} message="Not Found"></ErrorPage>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
