import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { Post } from "../lib/database/data/post";
import useOnlyFetchOncePerIdHook from "../lib/hooks/OnlyFetchOncePerIdHook";
import PostView from "./PostView";

export default function PostFeed(props: { posts: Post[] }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const [creators, setCreatorIds] = useOnlyFetchOncePerIdHook(
    new Set(props.posts.map((post) => post.creatorId)),
    async (valueId) => {
      return await backendService.getUserById(valueId, cookie.bearerToken);
    }
  );

  useEffect(() => {
    setCreatorIds(new Set(props.posts.map((post) => post.creatorId)));
  }, [props.posts, setCreatorIds]);

  const postViews = props.posts
    .sort(
      (a: Post, b: Post) =>
        (b.createdAt as Date).valueOf() - (a.createdAt as Date).valueOf()
    )
    .map((post) => (
      <PostView
        post={post}
        key={post.id}
        creator={creators ? creators.get(post.creatorId) : undefined}
        doNotFetchCreator={true}
      />
    ));

  return <div className="flex flex-col">{postViews}</div>;
}
