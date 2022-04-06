import { useCallback, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { MyFile } from "../lib/database/data/myFile";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import useOnlyFetchOncePerIdHook from "../lib/hooks/OnlyFetchOncePerIdHook";
import PostView from "./PostView";

export default function PostFeed(props: { posts: Post[] }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const [creators, setCreatorIds] = useOnlyFetchOncePerIdHook<User>(
    new Set(props.posts.map((post) => post.creatorId)),
    async (valueId) => {
      return await backendService.getUserById(valueId, cookie.bearerToken);
    }
  );

  const createProfilePictureIds: () => Set<string> = useCallback(() => {
    const profilePictureIdsTemp = new Set<string>();
    if (!creators) return profilePictureIdsTemp;
    creators.forEach((c) =>
      c.imageId !== null ? profilePictureIdsTemp.add(c.imageId) : {}
    );
    return profilePictureIdsTemp;
  }, [creators]);

  const [profilePictures, setProfilePictureIds] = useOnlyFetchOncePerIdHook<
    MyFile
  >(createProfilePictureIds(), async (valueId) => {
    return await backendService.getFileById(valueId, cookie.bearerToken);
  });

  useEffect(() => {
    setCreatorIds(new Set(props.posts.map((post) => post.creatorId)));
  }, [props.posts, setCreatorIds]);

  useEffect(() => {
    setProfilePictureIds(createProfilePictureIds());
  }, [createProfilePictureIds, setProfilePictureIds]);

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
        profilePicture={
          profilePictures && creators
            ? profilePictures.get(creators.get(post.creatorId)?.imageId)
            : undefined
        }
        doNotFetchProfilePicture={true}
      />
    ));

  return <div className="flex flex-col">{postViews}</div>;
}
