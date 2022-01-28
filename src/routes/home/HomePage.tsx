import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
import { Post } from "../../database/data/post";
import CreatePostView from "../../components/CreatePostView";
import useAccount from "../../hooks/AccountHook";

export default function HomePage(props: { appwriteService: AppwriteService }) {
  const [account] = useAccount(props.appwriteService);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }
    async function getPosts() {
      setPosts(await props.appwriteService.getAllPosts());
    }

    getPosts();
  }, [account]);

  let navigate = useNavigate();

  if (account == null) {
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
