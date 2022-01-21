import React, { useState } from "react";
import { User } from "../data/user";
import Database from "../database/database";
import HomePage from "../home/HomePage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage(props: { database: Database }) {
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(null);
  const [user, setUser] = useState<User | null>(null);

  props.database.getUser().then((loggedinUser) => {
    if (loggedinUser == null) {
      console.log("Not Logged in!");
      setWelcomeState(welcomeStateType.register);
      return;
    }
    console.log(`Logged in as ${loggedinUser.name}`);
    setUser(loggedinUser);
    setWelcomeState(welcomeStateType.login);
  });

  return (
    <>
      {user != null ? (
        <HomePage database={props.database} user={user}></HomePage>
      ) : (
        <></>
      )}
      {welcomeState != null ? (
        <>
          {welcomeState === welcomeStateType.register ? (
            <>
              <h1>Register</h1>
              <RegisterForm database={props.database}></RegisterForm>
            </>
          ) : (
            <>
              <h1>Login</h1>
              <LoginForm database={props.database}></LoginForm>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
