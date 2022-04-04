import { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Post } from "../lib/database/data/post";
import lottie, { AnimationItem } from "lottie-web";
import hearthLottie from "../public/lottie/hearth.json";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";

export default function PostLike(props: { post: Post }) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const [active, setActive] = useState<boolean>(false);
  const [count, setCount] = useState<number | undefined>(undefined);

  const animationContainer = useRef(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    backendService
      .getLikesCountByPostId(props.post.id, cookie.bearerToken)
      .then((c) => setCount(c));
    backendService
      .isPostLikedByMe(props.post.id, cookie.bearerToken)
      .then((a) => {
        setActive(a);
        anim.current?.goToAndStop(a ? 66 : 19, true);
      });
  }, [backendService, cookie.bearerToken, props.post.id]);

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
        className={`h-16 w-16 relative bottom-5 ${
          active
            ? "text-gray-900 dark:text-red-500"
            : "text-gray-200 dark:text-white"
        }`}
        ref={animationContainer}
        onClick={async () => {
          setActive(!active);
          if (!active) {
            anim.current?.playSegments([19, 50], true);
            await backendService.createLikeByPostId(
              props.post.id,
              cookie.bearerToken
            );
            setCount(count + 1);
          } else {
            anim.current?.playSegments([0, 19], true);
            await backendService.deleteLikeByPostId(
              props.post.id,
              cookie.bearerToken
            );
            setCount(count - 1);
          }
        }}
      />
      <span className="relative right-3">{count}</span>
    </>
  );
}
