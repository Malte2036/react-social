import { useContext, useEffect, useState } from "react";
import { Post } from "@/lib/database/data/post";
import CreatePostView from "@/components/CreatePostView";
import Button from "@/components/Button";
import { SocketContext } from "@/lib/contexts/SocketContext";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import PostFeed from "@/components/PostFeed";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { PostId } from "@/lib/database/data/postId";

export default function HomePage() {
  const [cookie, setCookie, removeCookie] = useCookies(["bearerToken"]);

  const backendService = useContext(BackendServiceContext);

  const [postIds, setPostIds] = useState<PostId[]>([]);

  const socket = useContext(SocketContext);

  let router = useRouter();

  useEffect(() => {
    backendService
      .getAllPostIds(cookie.bearerToken)
      .then((fetchedPostIds) => setPostIds(fetchedPostIds));
  }, [backendService, cookie.bearerToken]);

  useEffect(() => {
    socket.on("posts", (post: Post) => {
      post.createdAt = new Date(post.createdAt);

      const postIdsCopy = postIds !== undefined ? [...postIds] : [];
      postIdsCopy.push(post);
      setPostIds(postIdsCopy);
    });
    return () => {
      socket.off("posts");
    };
  }, [postIds, socket]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-10 max-w-4xl w-full flex flex-col justify-between">
        <div>
          <h1 className="text-center text-5xl font-extrabold">Feed</h1>
          <CreatePostView></CreatePostView>
          <PostFeed postIds={postIds} />
        </div>
        <Button
          onClickHandler={async () => {
            removeCookie("bearerToken");
            router.push("/login");
          }}
          className="umami--click--logout-button"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
