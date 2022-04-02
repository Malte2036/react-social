import { HeartIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";
import lottie, { AnimationItem } from "lottie-web";
import hearthLottie from "../public/lottie/hearth.json";

export default function PostLike(props: {
  backendService: BackendService;
  post: Post;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const [active, setActive] = useState<boolean>(false);
  const [count, setCount] = useState<number | undefined>(undefined);

  const animationContainer = useRef(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    props.backendService
      .getLikesCountByPostId(props.post.id, cookie.bearerToken)
      .then((c) => setCount(c));
    props.backendService
      .isPostLikedByMe(props.post.id, cookie.bearerToken)
      .then((a) => {
        setActive(a);
        anim.current?.goToAndStop(a ? 66 : 19, true);
      });
  }, [cookie.bearerToken, props.backendService, props.post.id]);

  useEffect(() => {
    if (animationContainer.current) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: hearthLottie,
      });
      return () => anim.current?.destroy();
    }
  }, []);

  return (
    <>
      <div
        className={`h-20 w-20    align-middle ${
          active
            ? "text-gray-900 dark:text-red-500"
            : "text-gray-200 dark:text-white"
        }`}
        ref={animationContainer}
        onClick={async () => {
          setActive(!active);
          if (!active) {
            anim.current?.playSegments([19, 50], true);
            await props.backendService.createLikeByPostId(
              props.post.id,
              cookie.bearerToken
            );
            setCount(count + 1);
          } else {
            anim.current?.playSegments([0, 19], true);
            await props.backendService.deleteLikeByPostId(
              props.post.id,
              cookie.bearerToken
            );
            setCount(count - 1);
          }
        }}
      />
      {count}
    </>
  );
}
