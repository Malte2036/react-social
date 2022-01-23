import React from "react";
import AppwriteService from "../../database/appwriteService";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage(props: { appwriteService: AppwriteService }) {
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(null);

  let navigate = useNavigate();

  props.appwriteService.getUser().then(async (loggedinUser) => {
    if (loggedinUser == null) {
      console.log("Not Logged in!");
      setWelcomeState(welcomeStateType.register);
      return;
    }
    console.log(`Logged in as ${loggedinUser.name}`);

    navigate("/home");
  });

  return (
    <>
      {welcomeState != null ? (
        <>
          {welcomeState === welcomeStateType.login ? (
            <>
              <h1>Register</h1>
              <RegisterForm appwriteService={props.appwriteService}></RegisterForm>
            </>
          ) : (
            <>
              <h1>Login</h1>
              <LoginForm appwriteService={props.appwriteService}></LoginForm>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
