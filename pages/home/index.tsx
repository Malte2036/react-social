import { useContext, useEffect, useState } from "react";
import BackendService from "../../lib/database/backendService";
import PostView from "../../components/PostView";
import { Post } from "../../lib/database/data/post";
import CreatePostView from "../../components/CreatePostView";
import Button from "../../components/Button";
import { SocketContext } from "../../lib/contexts/SocketContext";
import { User } from "../../lib/database/data/user";
import { useRouter } from "next/router";
import { parseCookies } from "../../helpers";
import { Account } from "../../lib/database/data/account";
import { useCookies } from "react-cookie";

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );

  const account = await backendService.getAccount(bearerToken);
  if (!account) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  let posts = await backendService.getAllPosts(bearerToken);

  posts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toString(),
  }));

  const creatorIds = [...new Set(posts.map((post) => post.creatorId))];

  const creators: Record<number, User> = {};
  await Promise.all(
    creatorIds.map(async (creatorId) => {
      creators[creatorId] = await backendService.getUserById(
        creatorId,
        bearerToken
      );
    })
  );

  return {
    props: { posts, creators, account }, // will be passed to the page component as props
  };
}

export default function HomePage(props: {
  posts: Post[];
  creators: User[];
  account: Account;
}) {
  const [cookie, setCookie] = useCookies(["bearerToken"]);

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

  let router = useRouter();

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
  }, []);

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
                  account={props.account}
                  key={post.id}
                ></PostView>
              ))}
          </div>
        </div>
        <Button
          children={"Logout"}
          onClickHandler={async () => {
            setCookie("bearerToken", null, { secure: true });
            router.push("/login");
          }}
        ></Button>
      </div>
    </div>
  );
}
