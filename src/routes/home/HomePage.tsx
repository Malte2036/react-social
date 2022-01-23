import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { User } from "../../database/data/user";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
import "./HomePage.css";

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
  if (user == null) {
    return <></>;
  }

  return (
    <div className="HomePage">
      <h1>Feed</h1>
      <PostView
        post={{
          id: "12345",
          message:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
          creator: "TestUser",
        }}
      ></PostView>
      <br />
      <PostView
        post={{ id: "123456", message: "Test123", creator: "Malte" }}
      ></PostView>
      <br />
      <PostView
        post={{ id: "1234567", message: "Hallo", creator: "Malte" }}
      ></PostView>
      <br />
      <LogoutButton appwriteService={props.appwriteService}></LogoutButton>
    </div>
  );
}
