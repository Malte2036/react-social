import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import PostView from "./PostView";

export default function PostFeed(props: { posts: Post[] }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const [creators, setCreators] = useState<Map<string, User> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!creators) {
      const creatorIds = [
        ...new Set(props.posts.map((post) => post.creatorId)),
      ];

      const creatorsTemp = new Map<string, User>();
      creatorIds.map(async (creatorId) => {
        const user = await backendService.getUserById(
          creatorId,
          cookie.bearerToken
        );
        setCreators(() => {
          creatorsTemp.set(creatorId, user);
          return new Map(creatorsTemp);
        });
      });
    }
  }, [backendService, cookie.bearerToken, creators, props.posts]);

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
