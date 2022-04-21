import { useContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import lottie, { AnimationItem } from "lottie-web";
import hearthLottie from "@/public/lottie/hearth.json";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import useSWR, { mutate } from "swr";
import { PostId } from "@/lib/database/data/postId";

export default function PostLike(props: { postId: PostId }) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const { data: activeData } = useSWR(
    `/posts/${props.postId.id}/likes/me`,
    async () =>
      await backendService.isPostLikedByMe(props.postId.id, cookie.bearerToken),
    {
      onSuccess: (data) => {
        setActive(data);
      },
    }
  );
  const [active, setActive] = useState<boolean>(false);

  const { data: count } = useSWR(
    "/posts/" + props.postId.id + "/likes",
    async () =>
      await backendService.getLikesCountByPostId(
        props.postId.id,
        cookie.bearerToken
      )
  );

  const animationContainer = useRef(null);
  const anim = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: hearthLottie,
        initialSegment: [10, 10],
      });
      return () => anim.current?.destroy();
    }
  }, []);

  useEffect(() => {
    if (active) {
      anim.current?.playSegments([19, 50], true);
    } else {
      anim.current?.playSegments([0, 19], true);
    }
  }, [active]);

  return (
    <>
      <div
        className={`h-16 w-16 relative bottom-5 cursor-pointer select-none umami--click--like-button ${
          active
            ? "text-gray-900 dark:text-red-500"
            : "text-gray-200 dark:text-white"
        }`}
        ref={animationContainer}
        onClick={async () => {
          setActive(!active);
          if (!activeData) {
            await backendService.createLikeByPostId(
              props.postId.id,
              cookie.bearerToken
            );
          } else {
            await backendService.deleteLikeByPostId(
              props.postId.id,
              cookie.bearerToken
            );
          }
          mutate("/posts/" + props.postId.id + "/likes");
          mutate("/posts/" + props.postId.id + "/likes/me");
        }}
      />
      <span className="relative right-3">{count}</span>
    </>
  );
}
