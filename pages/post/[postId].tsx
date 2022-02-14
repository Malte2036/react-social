import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import PostView from "../../components/PostView";
import BackendService from "../../lib/database/backendService";
import { Post } from "../../lib/database/data/post";
import { User } from "../../lib/database/data/user";
import { parseCookies } from "../../helpers";

export async function getServerSideProps({ req, query }) {
  const cookies = parseCookies(req);
  const bearerToken = cookies.bearerToken;

  const { postId } = query;

  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );
  let post = await backendService.getPostById(postId.toString(), bearerToken);
  if (post === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  post.createdAt = post.createdAt.toString();

  const creator = await backendService.getUserById(post.creatorId, bearerToken);

  return {
    props: { post, creator }, // will be passed to the page component as props
  };
}

export default function SinglePostPage(props: { post: Post; creator: User }) {
  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );
  props.post.createdAt = new Date(props.post.createdAt);

  const router = useRouter();
  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        <Link href={"/home"}>
          <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
        </Link>
        <PostView
          backendService={backendService}
          post={props.post}
          creator={props.creator}
        ></PostView>
      </div>
    </div>
  );
}
