import { PostId } from "@/lib/database/data/postId";
import PostView from "./PostView";

export default function PostFeed(props: { postIds: PostId[] }) {
  const postViews =
    props.postIds
      ?.sort(
        (a: PostId, b: PostId) =>
          (b.createdAt as Date).valueOf() - (a.createdAt as Date).valueOf()
      )
      .map((postId) => <PostView postId={postId} key={postId.id} />) ?? [];

  return <div className="flex flex-col">{postViews}</div>;
}
