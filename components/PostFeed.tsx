import { Post } from "@/lib/database/data/post";
import PostView from "./PostView";

export default function PostFeed(props: { posts: Post[] }) {
  const postViews =
    props.posts
      ?.sort(
        (a: Post, b: Post) =>
          (b.createdAt as Date).valueOf() - (a.createdAt as Date).valueOf()
      )
      .map((post) => <PostView post={post} key={post.id} />) ?? [];

  return <div className="flex flex-col">{postViews}</div>;
}
