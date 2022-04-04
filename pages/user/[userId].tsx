import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PostView from "../../components/PostView";
import BackendService from "../../lib/database/backendService";
import { Post } from "../../lib/database/data/post";
import { User } from "../../lib/database/data/user";
import { parseCookies } from "../../helpers";
import { Account } from "../../lib/database/data/account";
import { useCookies } from "react-cookie";
import ProfilePicture from "../../components/ProfilePicture";
import { useEffect, useState } from "react";
import PostFeed from "../../components/PostFeed";

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  let { userId } = query;
  userId = Number(userId);

  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );

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
  const [backendService] = useState(
    () =>
      new BackendService(
        process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
        Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
      )
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    backendService
      .getAllPostsByCreatorId(props.user.id.toString(), cookie.bearerToken)
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
            <ProfilePicture
              backendService={backendService}
              imageId={props.user.imageId || null}
              size={40}
            />
          </div>
          <div className="m-1 ml-2 h-14 text-3xl">
            <span className="align-middle">{props.user.name}</span>
          </div>
        </div>

        <PostFeed
          backendService={backendService}
          account={props.user}
          posts={posts}
        />
      </div>
    </div>
  );
}
