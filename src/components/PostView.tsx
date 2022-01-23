import { Post } from "../database/data/post";
import "./PostView.css";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: { post: Post }) {
  return (
    <div className="PostView">
      <div className="PostViewHeader">
        <ProfilePicture image="https://avatars.githubusercontent.com/u/18309412"></ProfilePicture>
        <span className="PostViewHeaderCreatorName">{props.post.creator}</span>
      </div>
      <p className="PostViewMessage">{props.post.message}</p>
    </div>
  );
}
