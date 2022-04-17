import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import Button from "./Button";
import { useTransition, animated } from "react-spring";

export default function CreatePostView(props: {}) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);

  const [message, setMessage] = useState("");
  const [active, setActive] = useState<Boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const transitions = useTransition(active, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
  });

  async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await backendService.createPost(
        message,
        image ?? undefined,
        cookie.bearerToken
      );
      setActive(false);
      setMessage("");
      setImage(null);
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <>
      <button className="w-full" onClick={() => setActive(!active)}>
        {active ? "Hide" : "Show"} Create Post
      </button>

      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <form
                className="w-full mt-8 space-y-6 flex-col"
                onSubmit={onSubmitHandler}
              >
                <div>
                  <textarea
                    value={message}
                    placeholder="Message"
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setMessage(event.target.value.slice(0, 8192))
                    }
                    required
                    className="resize-y appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  ></textarea>
                  <input
                    type="file"
                    onChange={(event) => {
                      if (event.target.files != null) {
                        setImage(event.target.files[0]);
                      }
                    }}
                    className="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="umami--click--create-post-button"
                >
                  Create Post
                </Button>
              </form>
            </animated.div>
          )
      )}
    </>
  );
}
