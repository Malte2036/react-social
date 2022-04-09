import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import PostView from "../../components/PostView";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { BackendServiceContext } from "../../lib/contexts/BackendServiceContext";
import useSWR from "swr";
import Error from "next/error";

export async function getServerSideProps({ req, query }) {
  return {
    props: { postId: query.postId },
  };
}

export default function SinglePostPage(props: { postId: string }) {
  const [cookie] = useCookies(["bearerToken"]);

  const backendService = useContext(BackendServiceContext);

  const { data: post, error: postError } = useSWR(
    "/posts/" + props.postId,
    async () =>
      await backendService.getPostById(props.postId, cookie.bearerToken)
  );

  if (postError) return <Error statusCode={404} title="Post not found" />;

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
