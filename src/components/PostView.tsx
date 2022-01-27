import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";
import { Post } from "../database/data/post";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: {
  appwriteService: AppwriteService;
  post: Post;
}) {
  const [profilePicture, setProfilePicture] = useState<
    string | null | undefined
  >(undefined);
  const [postImage, setPostImage] = useState<string | null | undefined>(
    undefined
  );

  let navigate = useNavigate();

  const creator = props.post.$write[0].replace("user:", "");

  if (profilePicture === undefined) {
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
  }
  if (postImage === undefined) {
    if (props.post.image == null) {
      setPostImage(null);
    } else {
      props.appwriteService
        .getFileById(props.post.image)
        .then((url) => setPostImage(url.toString()));
    }
  }
  return (
    <div className="rounded-lg my-3 border-4 border-gray-800 ">
      <div className="h-12 flex items-center border-b-4 border-gray-800">
        <ProfilePicture
          image={profilePicture !== undefined ? profilePicture : null}
        ></ProfilePicture>
        <span
          className="ml-2 cursor-pointer"
          onClick={() => navigate(`/user/${creator}`)}
        >
          {creator}
        </span>
      </div>
      <div className="m-8 flex flex-col">
        <p className="mt-0">{props.post.message}</p>
        {postImage !== undefined && postImage != null ? (
          <PostViewImage image={postImage}></PostViewImage>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
