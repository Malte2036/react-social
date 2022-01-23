import React from "react";
import AppwriteService from "../database/appwriteService";
import "./CreatePostView.css";

export default function CreatePostView(props: {
  appwriteService: AppwriteService;
}) {
  const [message, setMessage] = React.useState("");

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.appwriteService.createPost(message);
      alert("Post created");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <form className="CreatePostView" onSubmit={onSubmitHandler}>
      <textarea
        className="CreatePostViewMessageInput"
        value={message}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(event.target.value.slice(0, 255))
        }
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
}
