import { HeartIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";

export default function PostLike(props: {
  backendService: BackendService;
  post: Post;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const [active, setActive] = useState<boolean>(true);
  const [count, setCount] = useState<number>(props.post.likeCount || 0);

  useEffect(() => {
    props.backendService
      .getLikesCountByPostId(props.post.id, cookie.bearerToken)
      .then((c) => setCount(c));
    props.backendService
      .isPostLikedByMe(props.post.id, cookie.bearerToken)
      .then((a) => setActive(a));
  });

  return (
    <>
      <HeartIcon
        className={`h-5 w-5 ${
          active
            ? "text-gray-900 dark:text-red-500"
            : "text-gray-200 dark:text-white"
        }`}
        aria-hidden="true"
        onClick={async () => {
          setActive(!active);
          if (!active) {
            await props.backendService.createLikeByPostId(
              props.post.id,
              cookie.bearerToken
            );
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
