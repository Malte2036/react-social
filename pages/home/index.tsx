import { useContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import BackendService from "../../lib/database/backendService";
import PostView from "../../components/PostView";
import { Post } from "../../lib/database/data/post";
import CreatePostView from "../../components/CreatePostView";
import useAccount from "../../lib/hooks/AccountHook";
import Button from "../../components/Button";
import { SocketContext } from "../../lib/contexts/SocketContext";
import { User } from "../../lib/database/data/user";

export async function getServerSideProps(context) {
  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );
  let posts = await backendService.getAllPosts();

  posts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toString(),
  }));

  const creatorIds = [...new Set(posts.map((post) => post.creatorId))];

  const creators: Record<number, User> = {};
  await Promise.all(
    creatorIds.map(async (creatorId) => {
      creators[creatorId] = await backendService.getUserById(creatorId);
    })
  );

  return {
    props: { posts, creators }, // will be passed to the page component as props
  };
}

export default function HomePage(props: { posts: Post[]; creators: User[] }) {
  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );
  const [posts, setPosts] = useState<Post[]>(() =>
    props.posts.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt.toString()),
    }))
  );

  const socket = useContext(SocketContext);

  //let navigate = useNavigate();

  /*useEffect(
    () => {
      if (account === null) {
        //navigate("/login");
        return;
      }
      async function getPosts() {
        setPosts(await backendService.getAllPosts());
      }

      if (posts === undefined) {
        getPosts();
      }
    } [account, navigate, posts, backendService, socket]
  );*/

  useEffect(() => {
    socket.on("posts", (post: Post) => {
      post.createdAt = new Date(post.createdAt);

      const postsCopy = posts !== undefined ? [...posts] : [];
      postsCopy.push(post);
      setPosts(postsCopy);
    });
    return () => {
      socket.off("posts");
    };
  });

  /*if (account == null || posts === undefined) {
    return <></>;
  }*/

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-10 max-w-4xl w-full flex flex-col justify-between">
        <div>
          <h1 className="text-center text-5xl font-extrabold">Feed</h1>
          <CreatePostView backendService={backendService}></CreatePostView>
          <div className="flex flex-col">
            {posts
              .sort(
                (a: Post, b: Post) =>
                  b.createdAt.valueOf() - a.createdAt.valueOf()
              )
              .map((post) => (
                <PostView
                  backendService={backendService}
                  post={post}
                  creator={props.creators[post.creatorId]}
                  key={post.id}
                ></PostView>
              ))}
          </div>
        </div>
        <Button
          children={"Logout"}
          onClickHandler={async () => {
            await backendService.logout();
            //navigate("/login");
          }}
        ></Button>
      </div>
    </div>
  );
}
