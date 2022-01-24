import { ChangeEvent, FormEvent, useState } from "react";
import AppwriteService from "../database/appwriteService";
import "./CreatePostView.css";

export default function CreatePostView(props: {
  appwriteService: AppwriteService;
}) {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState<Boolean>(false);

  async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.appwriteService.createPost(message);
      alert("Post created");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <>
      <button
        className="ShowCreatePostButton"
        onClick={() => setActive(!active)}
      >
        {active ? "Hide" : "Show"} Create Post
      </button>
      {active ? (
        <form className="CreatePostView" onSubmit={onSubmitHandler}>
          <textarea
            className="CreatePostViewMessageInput"
            value={message}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(event.target.value.slice(0, 8192))
            }
            required
          ></textarea>
          <button type="submit">Create Post</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
