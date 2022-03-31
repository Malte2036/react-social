import { HeartIcon } from "@heroicons/react/solid";
import { useState } from "react";
import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";

export default function PostLike(props: {
  backendService: BackendService;
  post: Post;
}) {
  const [active, setActive] = useState<boolean>(true);
  const [count, setCount] = useState<number>(props.post.likeCount || 0);

  return (
    <>
      <HeartIcon
        className={`h-5 w-5 ${
          active
            ? "text-gray-900 dark:text-white"
            : "text-gray-200 dark:text-red-500"
        }`}
        aria-hidden="true"
        onClick={() => {
          setActive(!active);
          if (active) {
            setCount(count + 1);
          } else {
            setCount(count - 1);
          }
        }}
      />
      {count}
    </>
  );
}
