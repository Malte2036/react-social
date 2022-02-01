import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BackendService from "../database/backendService";
import useDarkmode from "../hooks/DarkmodeHook";
import ErrorPage from "./error/ErrorPage";
import HomePage from "./home/HomePage";
import SinglePostPage from "./post/SinglePostPage";
import SettingsPage from "./settings/SettingsPage";
import UserPage from "./user/UserPage";
import WelcomePage from "./welcome/WelcomePage";

export default function App() {
  const backendService = new BackendService(
    process.env.REACT_APP_APPWRITE_URL!,
    Number.parseInt(process.env.REACT_APP_APPWRITE_PORT!)
  );

  const [darkmode, setDarkmode] = useDarkmode(backendService);

  return (
    <div className={darkmode ? "dark" : ""}>
      <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-slate-900">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<WelcomePage backendService={backendService} />}
            />
            <Route
              path="/home"
              element={<HomePage backendService={backendService} />}
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  backendService={backendService}
                  darkmode={darkmode}
                  setDarkmode={setDarkmode}
                />
              }
            />
            <Route
              path="/user/:userId"
              element={<UserPage backendService={backendService} />}
            />
            <Route
              path="/post/:postId"
              element={<SinglePostPage backendService={backendService} />}
            />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="*"
              element={<ErrorPage code={404} message="Not Found"></ErrorPage>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
