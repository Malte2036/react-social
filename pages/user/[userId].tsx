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
  return (
    <>
      <h1 className="pt-6 text-center text-5xl font-extrabold ">
        User: {props.user.id}
      </h1>
      {(props.user as Account).email != undefined && (
        <>
          <h4 className="mt-6 text-center text-3xl">
            <br />
            Email: {props.user.email}
          </h4>
          <div>
            <h4 className="mt-6 text-center text-3xl">
              Upload ProfilePicture:
            </h4>
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files != null) {
                  const backendService = new BackendService(
                    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
                    Number.parseInt(
                      process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!
                    )
                  );
                  backendService.setCurrentUserProfilePicture(
                    event.target.files[0],
                    cookie.bearerToken
                  );
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
