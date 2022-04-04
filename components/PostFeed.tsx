import { useContext } from "react";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { Post } from "../lib/database/data/post";
import PostView from "./PostView";

export default function PostFeed(props: { posts: Post[] }) {
  const backendService = useContext(BackendServiceContext);
  return (
    <div className="flex flex-col">
      {props.posts
        .sort(
          (a: Post, b: Post) => b.createdAt.valueOf() - a.createdAt.valueOf()
        )
        .map((post) => (
          <PostView
            post={post}
            key={post.id}
          />
        ))}
    </div>
  );
}
