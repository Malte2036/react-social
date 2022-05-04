import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { Comment } from "@/lib/database/data/comment";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import ProfilePicture from "./ProfilePicture";

export default function PostComment(props: { comment: Comment }) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const { data: creator } = useSWR(
    `/users/${props.comment.creatorId}`,
    async () =>
      await backendService.getUserById(
        props.comment.creatorId,
        cookie.bearerToken
      )
  );
  return (
    <div className="absolute left-0 flex flex-row">
      <div className="mr-2">
        <ProfilePicture imageId={creator?.imageId} size={26} />
      </div>
      <div>{props.comment.message}</div>
    </div>
  );
}
