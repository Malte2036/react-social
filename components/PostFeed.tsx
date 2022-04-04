import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import PostView from "./PostView";

export default function PostFeed(props: {
  backendService: BackendService;
  posts: Post[];
  account: User;
}) {
  return (
    <div className="flex flex-col">
      {props.posts
        .sort(
          (a: Post, b: Post) => b.createdAt.valueOf() - a.createdAt.valueOf()
        )
        .map((post) => (
          <PostView
            backendService={props.backendService}
            post={post}
            account={props.account}
            key={post.id}
          />
        ))}
    </div>
  );
}
