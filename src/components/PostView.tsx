import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";
import { Post } from "../database/data/post";
import PostViewImage from "./PostViewImage";
import "./PostView.css";
import ProfilePicture from "./ProfilePicture";
import { url } from "inspector";

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
    <div className="PostView">
      <div className="PostViewHeader">
        <ProfilePicture
          image={profilePicture !== undefined ? profilePicture : null}
        ></ProfilePicture>
        <span
          className="PostViewHeaderCreatorName"
          onClick={() => navigate(`/user/${creator}`)}
        >
          {creator}
        </span>
      </div>
      <p className="PostViewMessage">{props.post.message}</p>
      {postImage !== undefined && postImage != null ? (
        <PostViewImage image={postImage}></PostViewImage>
      ) : (
        <></>
      )}
    </div>
  );
}
