import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Post } from "../../lib/database/data/post";
import { User } from "../../lib/database/data/user";
import { parseCookies } from "../../helpers";
import { Account } from "../../lib/database/data/account";
import { useCookies } from "react-cookie";
import ProfilePicture from "../../components/ProfilePicture";
import { useContext, useEffect, useState } from "react";
import PostFeed from "../../components/PostFeed";
import { backendService, BackendServiceContext } from "../../lib/contexts/BackendServiceContext";
import { useAccount } from "../../lib/contexts/AccountContext";
import { useRouter } from "next/router";

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  let { userId } = query;

  const account = await backendService.getAccount(bearerToken);
  if (!account) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (account.id === userId) {
    return {
      props: { user: account },
    };
  }

  const user = await backendService.getUserById(userId, bearerToken);
  if (user === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  return {
    props: { user },
  };
}
export default function UserPage(props: { user: User | Account }) {
  const [cookie] = useCookies(["bearerToken"]);
  const backendService = useContext(BackendServiceContext);
  const [account] = useAccount();

  const router = useRouter()

  const [posts, setPosts] = useState<Post[]>([]);

  async function changeProfilePicture(event): Promise<void> {
    if (event.target.files != null) {
      await backendService.setCurrentUserProfilePicture(
        event.target.files[0],
        cookie.bearerToken
      );
      router.reload();
    }
  }

  useEffect(() => {
    backendService
      .getAllPostsByCreatorId(props.user.id, cookie.bearerToken)
      .then((posts) => setPosts(posts));
  }, [backendService, cookie.bearerToken, props.user.id]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        <Link href={"/home"} passHref>
          <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
        </Link>
        <div className="relative top-4 h-14 left-0 m-2 flex flex-row">
          <div className="relative top-1">
            <ProfilePicture imageId={props.user.imageId || null} size={40} borderColorClass="border-white dark:border-slate-800" />
          </div>
          <div className="m-1 ml-2 h-14 text-3xl">
            <span className="align-middle">{props.user.name}</span>
          </div>
        </div>
        {account.id === props.user.id ? (
          <div className="flex flex-col">
            <span className="mt-6">Upload ProfilePicture:</span>
            <input
              type="file"
              onChange={changeProfilePicture}
            />
          </div>
        ) : (
          <></>
        )}

        <PostFeed posts={posts} />
      </div>
    </div>
  );
}
