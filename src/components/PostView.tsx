import { useState } from "react";
import AppwriteService from "../database/appwriteService";
import { Post } from "../database/data/post";
import "./PostView.css";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: {
  appwriteService: AppwriteService;
  post: Post;
}) {
  const [profilePicture, setProfilePicture] = useState<
    string | null | undefined
  >(undefined);

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

  return (
    <div className="PostView">
      <div className="PostViewHeader">
        <ProfilePicture
          image={profilePicture !== undefined ? profilePicture : null}
        ></ProfilePicture>
        <span className="PostViewHeaderCreatorName">{creator}</span>
      </div>
      <p className="PostViewMessage">{props.post.message}</p>
    </div>
  );
}
