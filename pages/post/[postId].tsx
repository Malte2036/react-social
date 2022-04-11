import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import PostView from "@/components/PostView";
import { PostId } from "@/lib/database/data/postId";

export async function getServerSideProps(props: { query: any }) {
  const postId = { id: props.query.postId } as PostId;
  return {
    props: { postId },
  };
}

export default function SinglePostPage(props: { postId: PostId }) {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        <Link href={"/home"} passHref>
          <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
        </Link>
        <PostView postId={props.postId} showComments={true}></PostView>
      </div>
    </div>
  );
}
