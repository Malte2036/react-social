import { useNavigate } from "react-router-dom";
import BackendService from "../database/backendService";
import { Post } from "../database/data/post";
import useAccount from "../hooks/AccountHook";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";

export default function PostView(props: {
  backendService: BackendService;
  post: Post;
}) {
  const [account] = useAccount(props.backendService);

  let navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          <ProfilePicture
            image={props.post.creator.image || null}
          ></ProfilePicture>
          <span
            className="m-1 ml-2 cursor-pointer"
            onClick={() => navigate(`/user/${props.post.creator.id}`)}
          >
            {props.post.creator.name}
          </span>
        </div>
        <div className="absolute right-3 m-3 flex flex-row">
          <span className="text-xs pt-0.5 opacity-50">
            {props.post.createdAt.toDateString()}
          </span>
          {account?.id === props.post.creator.id && (
            <PostViewDropdown
              backendService={props.backendService}
              post={props.post}
            ></PostViewDropdown>
          )}
        </div>
      </div>

      <div
        className="cursor-pointer"
        onClick={() => navigate(`/post/${props.post.id}`)}
      >
        <div className="m-8 flex flex-col">
          <p className="mt-0 break-all">{props.post.message}</p>
          {props.post.image != null && (
            <PostViewImage image={props.post.image}></PostViewImage>
          )}
        </div>
      </div>
    </div>
  );
}
