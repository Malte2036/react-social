import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { User } from "../../database/data/user";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
import "./HomePage.css";
import { Post } from "../../database/data/post";

export default function HomePage(props: { appwriteService: AppwriteService }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  let navigate = useNavigate();

  if (user == null) {
    props.appwriteService.getUser().then((userFromDatabase) => {
      if (userFromDatabase === null) {
        navigate("/login");
        return;
      }
      setUser(userFromDatabase);

      console.log("fetch");
      props.appwriteService
        .getAllPosts()
        .then((postsFromDatabase) => setPosts(postsFromDatabase));
    });
    return <></>;
  }

  return (
    <div className="HomePage">
      <h1>Feed</h1>
      {posts.map((post) => (
        <>
          <PostView post={post}></PostView>
          <br />
        </>
      ))}
      <LogoutButton appwriteService={props.appwriteService}></LogoutButton>
    </div>
  );
}
