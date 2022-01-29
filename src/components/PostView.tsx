import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";
import { getCreatorByWritePermission, Post } from "../database/data/post";
import useAccount from "../hooks/AccountHook";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: {
  appwriteService: AppwriteService;
  post: Post;
}) {
  const [account] = useAccount(props.appwriteService);
  const creator = getCreatorByWritePermission(props.post.$write[0]);

  const [profilePicture, setProfilePicture] = useState<
    string | null | undefined
  >(() => {
    props.appwriteService.getUserById(creator).then(async (user) => {
      if (user == null || user.picture == null) {
        setProfilePicture(null);
        return;
      }
      try {
        const url = await props.appwriteService.getFileById(user.picture);
        setProfilePicture(url.toString());
      } catch (error) {
        setProfilePicture(null);
      }
    });
    return undefined;
  });
  const [postImage, setPostImage] = useState<string | null | undefined>(() => {
    if (props.post.image == null) {
      return null;
    } else {
      props.appwriteService
        .getFileById(props.post.image)
        .then((url) => setPostImage(url.toString()));
    }

    return undefined;
  });

  let navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          <ProfilePicture
            image={profilePicture !== undefined ? profilePicture : null}
          ></ProfilePicture>
          <span
            className="m-1 ml-2 cursor-pointer"
            onClick={() => navigate(`/user/${creator}`)}
          >
            {creator}
          </span>
        </div>
        {account?.$id === creator ? (
          <div className="absolute right-3 m-3">
            <PostViewDropdown
              appwriteService={props.appwriteService}
              post={props.post}
            ></PostViewDropdown>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className="cursor-pointer"
        onClick={() => navigate(`/post/${props.post.$id}`)}
      >
        <div className="m-8 flex flex-col">
          <p className="mt-0 break-all">{props.post.message}</p>
          {postImage !== undefined && postImage != null ? (
            <PostViewImage image={postImage}></PostViewImage>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
