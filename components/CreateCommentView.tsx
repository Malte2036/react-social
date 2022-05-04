import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { PostId } from "@/lib/database/data/postId";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { mutate } from "swr";
import InputField from "./form/InputField";

export default function CreateCommentView(props: { postId: PostId }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const [comment, setComment] = useState<string>("");

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(comment);
    await backendService.createCommentByPostId(
      comment,
      props.postId.id,
      cookie.bearerToken
    );
    mutate("/posts/" + props.postId.id + "/comments");
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <InputField type="text" placeholder="Comment" setValue={setComment} value={comment} />
      <button type="submit">Create Comment</button>
    </form>
  );
}
