import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PostView from "../../components/PostView";
import { Post } from "../../lib/database/data/post";
import { parseCookies } from "../../helpers";
import { Account } from "../../lib/database/data/account";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { backendService, BackendServiceContext } from "../../lib/contexts/BackendServiceContext";

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  const { postId } = query;

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

  const backendService = useContext(BackendServiceContext);

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
  }, [backendService, cookie.bearerToken, props.postId, router]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        {post ? (
          <>
            <Link href={"/home"} passHref>
              <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
            </Link>
            <PostView post={post} showComments={true}></PostView>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
