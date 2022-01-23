import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { User } from "../../data/user";
import Database from "../../database/database";

export default function HomePage(props: { database: Database }) {
  const [user, setUser] = useState<User | null>(null);

  let navigate = useNavigate();

  if (user == null) {
    props.database.getUser().then((userFromDatabase) => {
      if (userFromDatabase === null) {
        navigate("/login");
        return;
      }
      setUser(userFromDatabase);
    });
  }
  return (
    <>
      {user != null ? (
        <>
          <h1>Home</h1>
          <h4>ID: {user.id}</h4>
          <h4>Name: {user.name}</h4>
          <h4>Email: {user.email}</h4>
          <LogoutButton database={props.database}></LogoutButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
