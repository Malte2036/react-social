import { PostId } from "@/lib/database/data/postId";
import { compareByCreatedAt } from "../helpers";
import PostView from "./PostView";

export default function PostFeed(props: { postIds: PostId[] }) {
  const postViews =
    props.postIds
      ?.sort(compareByCreatedAt)
      .map((postId) => <PostView postId={postId} key={postId.id} />) ?? [];

  return <div className="flex flex-col">{postViews}</div>;
}
