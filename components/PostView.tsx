import { useContext } from "react";
import { Post } from "@/lib/database/data/post";
import { User } from "@/lib/database/data/user";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import PostLike from "./PostLike";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { useAccount } from "@/lib/contexts/AccountContext";
import { MyFile } from "@/lib/database/data/myFile";
import useSWR from "swr";

export default function PostView(props: {
  post: Post;
  showComments?: boolean;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const [account] = useAccount();

  const { data: creator } = useSWR(
    `/users/${props.post.creatorId}`,
    async () =>
      await backendService.getUserById(props.post.creatorId, cookie.bearerToken)
  );

  const { data: comments } = useSWR(
    props.showComments ? "/posts/" + props.post.id + "/comments" : null,
    async () =>
      await backendService.getCommentsByPostId(
        props.post.id,
        cookie.bearerToken
      )
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          {creator ? (
            <>
              <ProfilePicture
                imageId={creator.imageId || null}
              ></ProfilePicture>
              <div className="umami--click--visit-user-button">
                <Link href={`/user/${props.post.creatorId}`} passHref>
                  <span className="m-1 ml-2 cursor-pointer">
                    {creator.name}
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="absolute right-3 m-3 flex flex-row">
          <span className="text-xs pt-0.5 opacity-50">
            {(props.post.createdAt as Date).toDateString()}
          </span>
          {account?.id === props.post.creatorId && (
            <PostViewDropdown post={props.post} />
          )}
        </div>
      </div>

      <Link href={`/post/${props.post.id}`} passHref>
        <div className="cursor-pointer">
          <div className="m-8 flex flex-col">
            <p className="mt-0 break-all">{props.post.message}</p>
            {props.post.imageId != null && (
              <PostViewImage imageId={props.post.imageId} />
            )}
          </div>
        </div>
      </Link>

      <div className="relative h-12 border-t-2 border-gray-200 dark:border-gray-900">
        <div className=" m-2 ml-4 flex flex-row">
          <PostLike post={props.post} />
        </div>
      </div>
      {props.showComments && comments ? (
        <div className="bg-gray-200 dark:bg-slate-900 rounded-b-3xl">
          {comments.map((comment) => {
            return (
              <div
                className="relative h-12 border-2 border-white dark:border-slate-800"
                key={comment.id}
              >
                <div className="absolute left-0 m-2 flex flex-row">
                  <div className="cursor-pointer">
                    <div>{comment.message}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
