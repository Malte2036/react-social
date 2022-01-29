import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../../database/appwriteService";
import PostView from "../../components/PostView";
import { Post } from "../../database/data/post";
import CreatePostView from "../../components/CreatePostView";
import useAccount from "../../hooks/AccountHook";
import Button from "../../components/Button";

export default function HomePage(props: { appwriteService: AppwriteService }) {
  const [account] = useAccount(props.appwriteService);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);

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

  if (account == null || posts === undefined) {
    return <></>;
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-10 max-w-4xl w-full flex flex-col justify-between">
        <div>
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
        </div>
        <Button
          children={"Logout"}
          onClickHandler={async () => {
            await props.appwriteService.logout();
            navigate("/login");
          }}
        ></Button>
      </div>
    </div>
  );
}
