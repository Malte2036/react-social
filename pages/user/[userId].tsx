import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { User } from "@/lib/database/data/user";
import { parseCookies } from "@/helpers";
import { useCookies } from "react-cookie";
import ProfilePicture from "@/components/ProfilePicture";
import { useContext } from "react";
import PostFeed from "@/components/PostFeed";
import { backendService, BackendServiceContext } from "@/lib/contexts/BackendServiceContext";
import { useAccount } from "@/lib/contexts/AccountContext";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";

export async function getServerSideProps({ req, query }) {
  return {
    props: {
      userId: query.userId,
    },
  };
}
export default function UserPage(props: { userId: string }) {
  const backendService = useContext(BackendServiceContext);
  const [cookie] = useCookies(["bearerToken"]);
  const [account] = useAccount();

  const router = useRouter();

  const { data: user, error: userError } = useSWR(
    `/user/${props.userId}`,
    async () =>
      await backendService.getUserById(props.userId, cookie.bearerToken)
  );

  const { data: posts } = useSWR(
    user ? `/posts/byCreatorId/${user.id}` : null,
    async () =>
      await backendService.getAllPostsByCreatorId(user.id, cookie.bearerToken)
  );

  async function changeProfilePicture(event): Promise<void> {
    if (event.target.files != null) {
      await backendService.setCurrentUserProfilePicture(
        event.target.files[0],
        cookie.bearerToken
      );
      router.reload();
    }
  }

  if (userError) return <Error statusCode={404} title="User not found" />;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="m-5 mt-3 max-w-4xl w-full flex flex-col">
        <Link href={"/home"} passHref>
          <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 ml-0.5 cursor-pointer"></ArrowLeftIcon>
        </Link>
        <div className="relative top-4 h-14 left-0 m-2 flex flex-row">
          <div className="relative top-1">
            <ProfilePicture
              imageId={user?.imageId}
              size={40}
              borderColorClass="border-white dark:border-slate-800"
            />
          </div>
          <div className="m-1 ml-2 h-14 text-3xl">
            <span className="align-middle">{user?.name}</span>
          </div>
        </div>
        {account.id === user?.id ? (
          <div className="flex flex-col">
            <span className="mt-6">Upload ProfilePicture:</span>
            <input type="file" onChange={changeProfilePicture} />
          </div>
        ) : (
          <></>
        )}

        <PostFeed posts={posts} />
      </div>
    </div>
  );
}
