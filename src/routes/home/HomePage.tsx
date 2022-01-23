import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { User } from "../../database/data/user";
import AppwriteService from "../../database/appwriteService";

export default function HomePage(props: { appwriteService: AppwriteService }) {
  const [user, setUser] = useState<User | null>(null);

  let navigate = useNavigate();

  if (user == null) {
    props.appwriteService.getUser().then((userFromDatabase) => {
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
          <LogoutButton appwriteService={props.appwriteService}></LogoutButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
