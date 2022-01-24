import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { Account } from "../../database/data/account";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
import "./HomePage.css";
import { Post } from "../../database/data/post";
import CreatePostView from "../../components/CreatePostView";

export default function HomePage(props: { appwriteService: AppwriteService }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  let navigate = useNavigate();

  if (account == null) {
    props.appwriteService.getAccount().then((accountFromDatabase) => {
      if (accountFromDatabase === null) {
        navigate("/login");
        return;
      }
      setAccount(accountFromDatabase);

      props.appwriteService
        .getAllPosts()
        .then((postsFromDatabase) => setPosts(postsFromDatabase));
    });
    return <></>;
  }

  return (
    <div className="HomePage">
      <h1>Feed</h1>
      <CreatePostView appwriteService={props.appwriteService}></CreatePostView>
      <div className="Posts">
        {posts
          .sort((a: Post, b: Post) => b.date - a.date)
          .map((post) => (
            <PostView post={post} key={post.$id}></PostView>
          ))}
      </div>
      <LogoutButton appwriteService={props.appwriteService}></LogoutButton>
    </div>
  );
}
