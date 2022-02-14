import { useEffect, useState } from "react";
import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import useAccount from "../lib/hooks/AccountHook";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";

export default function PostView(props: {
  backendService: BackendService;
  post: Post;
  creator: User;
}) {
  const [account] = useAccount(props.backendService);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          <ProfilePicture
            backendService={props.backendService}
            imageId={props.creator.imageId || null}
          ></ProfilePicture>
          <Link href={`/user/${props.post.creatorId}`}>
            <span className="m-1 ml-2 cursor-pointer">{props.creator.name}</span>
          </Link>
        </div>
        <div className="absolute right-3 m-3 flex flex-row">
          <span className="text-xs pt-0.5 opacity-50">
            {props.post.createdAt.toDateString()}
          </span>
          {account?.id === props.creator.id && (
            <PostViewDropdown
              backendService={props.backendService}
              post={props.post}
            ></PostViewDropdown>
          )}
        </div>
      </div>

      <Link href={`/post/${props.post.id}`}>
        <div className="cursor-pointer">
          <div className="m-8 flex flex-col">
            <p className="mt-0 break-all">{props.post.message}</p>
            {props.post.imageId != null && (
              <PostViewImage
                backendService={props.backendService}
                imageId={props.post.imageId}
              ></PostViewImage>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
