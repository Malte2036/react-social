import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppwriteService from "../database/appwriteService";
import useDarkmode from "../hooks/DarkmodeHook";
import ErrorPage from "./error/ErrorPage";
import HomePage from "./home/HomePage";
import SettingsPage from "./settings/SettingsPage";
import UserPage from "./user/UserPage";
import WelcomePage from "./welcome/WelcomePage";

export default function App() {
  const appwriteService = new AppwriteService(
    process.env.REACT_APP_APPWRITE_URL!,
    process.env.REACT_APP_APPWRITE_PROJECT_ID!,
    process.env.REACT_APP_APPWRITE_POSTS_COLLECTION_ID!,
    process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID!
  );

  useDarkmode(appwriteService);

  return (
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
            path="/settings"
            element={<SettingsPage appwriteService={appwriteService} />}
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
  );
}
