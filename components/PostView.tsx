import { useContext, useEffect, useState } from "react";
import { Post } from "../lib/database/data/post";
import { User } from "../lib/database/data/user";
import PostViewDropdown from "./PostViewDropdown";
import PostViewImage from "./PostViewImage";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import PostLike from "./PostLike";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../lib/contexts/BackendServiceContext";
import { useAccount } from "../lib/contexts/AccountContext";
import { MyFile } from "../lib/database/data/myFile";
import { Comment } from "../lib/database/data/comment";

export default function PostView(props: {
  post: Post;
  creator?: User;
  doNotFetchCreator?: boolean;
  profilePicture?: MyFile;
  doNotFetchProfilePicture?: boolean;
  showComments?: boolean;
}) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);

  const [account] = useAccount();

  const [creator, setCreator] = useState<User | undefined>(undefined);
  const [profilePicture, setProfilePicture] = useState<MyFile | undefined>(
    undefined
  );

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (props.showComments) {
      const fetchComments = async () => {
        const fetchedComments = await backendService.getCommentsByPostId(
          props.post.id,
          cookie.bearerToken
        );
        setComments(fetchedComments);
      };
      fetchComments();
    }
  }, [backendService, cookie.bearerToken, props.post.id, props.showComments]);

  useEffect(() => {
    setCreator(props.creator);
  }, [props.creator]);

  useEffect(() => {
    setProfilePicture(props.profilePicture);
  }, [props.profilePicture]);

  useEffect(() => {
    if (!props.doNotFetchCreator) {
      const fetchCreator = async () => {
        const fetchedCreator = await backendService.getUserById(
          props.post.creatorId,
          cookie.bearerToken
        );
        setCreator(fetchedCreator);
      };
      fetchCreator();
    }
  }, [
    backendService,
    cookie.bearerToken,
    props.doNotFetchCreator,
    props.post.creatorId,
  ]);

  useEffect(() => {
    if (!props.doNotFetchProfilePicture && creator) {
      const fetchProfilePicture = async () => {
        const fetchedFile = await backendService.getFileById(
          creator.imageId,
          cookie.bearerToken
        );
        setProfilePicture(fetchedFile);
      };
      fetchProfilePicture();
    }
  }, [
    backendService,
    cookie.bearerToken,
    creator,
    props.doNotFetchProfilePicture,
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-3 shadow-xl">
      <div className="relative h-12 border-b-2 border-gray-200 dark:border-gray-900">
        <div className="absolute left-0 m-2 flex flex-row">
          {creator ? (
            <>
              <ProfilePicture
                imageId={creator.imageId || null}
                picture={profilePicture}
                doNotFetchPicture={true}
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
          {account.id === props.post.creatorId && (
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
      {props.showComments ? (
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
