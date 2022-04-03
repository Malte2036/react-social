import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PostView from "../../components/PostView";
import BackendService from "../../lib/database/backendService";
import { Post } from "../../lib/database/data/post";
import { User } from "../../lib/database/data/user";
import { parseCookies } from "../../helpers";
import { Account } from "../../lib/database/data/account";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  const { postId } = query;

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

  return {
    props: { postId, account },
  };
}

export default function SinglePostPage(props: {
  postId: string;
  account: Account;
}) {
  const [cookie, setCookie, removeCookie] = useCookies(["bearerToken"]);

  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );

  const [post, setPost] = useState<Post | undefined>(undefined);

  let router = useRouter();

  useEffect(() => {
    backendService
      .getPostById(props.postId, cookie.bearerToken)
      .then((post) => {
        if (post) {
          setPost(post);
        } else {
          router.push("/home");
        }
      });
  }, [cookie.bearerToken]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        {post ? (
          <>
            <Link href={"/home"} passHref>
              <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
            </Link>
            <PostView
              backendService={backendService}
              post={post}
              account={props.account}
            ></PostView>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
