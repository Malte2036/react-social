import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendService from "../../database/backendService";
import PostView from "../../components/PostView";
import { Post } from "../../database/data/post";
import CreatePostView from "../../components/CreatePostView";
import useAccount from "../../hooks/AccountHook";
import Button from "../../components/Button";
import { SocketContext } from "../../contexts/SocketContext";

export default function HomePage(props: { backendService: BackendService }) {
  const [account] = useAccount(props.backendService);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);

  const socket = useContext(SocketContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }
    async function getPosts() {
      setPosts(await props.backendService.getAllPosts());
    }

    if (posts === undefined) {
      getPosts();
    }
  }, [account, navigate, posts, props.backendService, socket]);

  useEffect(() => {
    socket.on("posts", (post: Post) => {
      const postsCopy = posts !== undefined ? [...posts] : [];
      postsCopy.push(post);
      setPosts(postsCopy);
    });
    return () => {
      socket.off("posts");
    };
  });

  if (account == null || posts === undefined) {
    return <></>;
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-10 max-w-4xl w-full flex flex-col justify-between">
        <div>
          <h1 className="text-center text-5xl font-extrabold">Feed</h1>
          <CreatePostView
            backendService={props.backendService}
          ></CreatePostView>
          <div className="flex flex-col">
            {posts
              .sort(
                (a: Post, b: Post) =>
                  b.createdAt.valueOf() - a.createdAt.valueOf()
              )
              .map((post) => (
                <PostView
                  backendService={props.backendService}
                  post={post}
                  key={post.id}
                ></PostView>
              ))}
          </div>
        </div>
        <Button
          children={"Logout"}
          onClickHandler={async () => {
            await props.backendService.logout();
            navigate("/login");
          }}
        ></Button>
      </div>
    </div>
  );
}
