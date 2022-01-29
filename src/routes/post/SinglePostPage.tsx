import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import PostView from "../../components/PostView";
import AppwriteService from "../../database/appwriteService";
import { Post } from "../../database/data/post";
import useAccount from "../../hooks/AccountHook";
import ErrorPage from "../error/ErrorPage";

export default function SinglePostPage(props: {
  appwriteService: AppwriteService;
}) {
  const [account] = useAccount(props.appwriteService);
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  let navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }

    async function fetchPost() {
      if (postId == null) {
        navigate("/home");
        return;
      }

      setPost(await props.appwriteService.getPostById(postId));
    }

    fetchPost();
  }, [account]);

  if (postId == null || post === undefined) {
    return <></>;
  }

  if (post === null) {
    return (
      <ErrorPage
        code={404}
        message={`Post with id=${postId} not found`}
      ></ErrorPage>
    );
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        <ArrowLeftIcon
          className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"
          onClick={() => navigate("/home")}
        ></ArrowLeftIcon>
        <PostView
          appwriteService={props.appwriteService}
          post={post}
        ></PostView>
      </div>
    </div>
  );
}
