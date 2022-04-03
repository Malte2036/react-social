import { useEffect, useState } from "react";
import BackendService from "../lib/database/backendService";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import useAccount from "../lib/hooks/AccountHook";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import { Account } from "../lib/database/data/account";
import PostLike from "./PostLike";
import { useCookies } from "react-cookie";

export default function PostView(props: {
  backendService: BackendService;
  post: Post;
  account: Account;
}) {
  const [cookie, setCookie, removeCookie] = useCookies(["bearerToken"]);
  const [creator, setCreator] = useState<User | undefined>(undefined);
  useEffect(() => {
    props.backendService
      .getUserById(props.post.creatorId, cookie.bearerToken)
      .then((creator) => setCreator(creator));
  }, [cookie.bearerToken, props.backendService, props.post.creatorId]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          {creator ? (
            <>
              <ProfilePicture
                backendService={props.backendService}
                imageId={creator.imageId || null}
              ></ProfilePicture>
              <Link href={`/user/${props.post.creatorId}`} passHref>
                <span className="m-1 ml-2 cursor-pointer">{creator.name}</span>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="absolute right-3 m-3 flex flex-row">
          <span className="text-xs pt-0.5 opacity-50">
            {(props.post.createdAt as Date).toDateString()}
          </span>
          {props.account.id === props.post.creatorId && (
            <PostViewDropdown
              backendService={props.backendService}
              post={props.post}
            ></PostViewDropdown>
          )}
        </div>
      </div>

      <Link href={`/post/${props.post.id}`} passHref>
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

      <div className="relative h-12 border-t-2 border-gray-200 dark:border-gray-900">
        <div className=" m-2 ml-4 flex flex-row">
          <PostLike backendService={props.backendService} post={props.post} />
        </div>
      </div>
    </div>
  );
}
