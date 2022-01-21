import React from "react";
import { User } from "../data/user";
import Database from "../database/database";

enum welcomeStateType {
  login,
  register,
}

export default function HomePage(props: { database: Database; user: User }) {
  return (
    <>
      <h1>Home</h1>
      <h4>ID: {props.user.id}</h4>
      <h4>Name: {props.user.name}</h4>
      <h4>Email: {props.user.email}</h4>
    </>
  );
}
