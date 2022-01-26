import { ChangeEvent, FormEvent, useState } from "react";
import AppwriteService from "../database/appwriteService";
import "./CreatePostView.css";

export default function CreatePostView(props: {
  appwriteService: AppwriteService;
}) {
  const [message, setMessage] = useState("");
  const [active, setActive] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      let fileId = undefined;
      if (image != null) {
        const file = await props.appwriteService.uploadFile(image);
        fileId = file.$id;
      }

      await props.appwriteService.createPost(message, fileId);

      window.location.reload();
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
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files != null) {
                setImage(event.target.files[0]);
              }
            }}
          />
          <button type="submit">Create Post</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
