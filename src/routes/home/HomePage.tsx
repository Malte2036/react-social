import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { Account } from "../../database/data/account";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
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
    <div className="flex justify-center">
      <div className="m-5 mt-10 max-w-4xl">
        <h1 className="text-center text-5xl font-extrabold">Feed</h1>
        <CreatePostView
          appwriteService={props.appwriteService}
        ></CreatePostView>
        <div className="flex flex-col">
          {posts
            .sort((a: Post, b: Post) => b.date - a.date)
            .map((post) => (
              <PostView
                appwriteService={props.appwriteService}
                post={post}
                key={post.$id}
              ></PostView>
            ))}
        </div>
        <LogoutButton appwriteService={props.appwriteService}></LogoutButton>
      </div>
    </div>
  );
}
