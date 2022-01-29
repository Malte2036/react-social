import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../../database/appwriteService";
import { User } from "../../database/data/user";
import ErrorPage from "../error/ErrorPage";
import useAccount from "../../hooks/AccountHook";
import { getCreatorByWritePermission } from "../../database/data/post";

export default function UserPage(props: { appwriteService: AppwriteService }) {
  const [account] = useAccount(props.appwriteService);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  let navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }

    async function fetchUser() {
      if (userId == null) {
        navigate("/home");
        return;
      }

      setUser(await props.appwriteService.getUserById(userId));
    }

    fetchUser();
  }, [account]);

  if (userId == null) {
    return <></>;
  }

  if (user === null) {
    return (
      <ErrorPage
        code={404}
        message={`User with id=${userId} not found`}
      ></ErrorPage>
    );
  }

  if (account == null || user === undefined) {
    return <></>;
  }

  return (
    <div className="UserPage">
      <h1 className="mt-6 text-center text-5xl font-extrabold ">
        User: {userId}
      </h1>
      {account.$id === user.$id && (
        <>
          <h4 className="mt-6 text-center text-3xl">
            ID: {getCreatorByWritePermission(user!.$write[0])}
            <br />
            Email: {account.email}
          </h4>
          <div>
            <h4 className="mt-6 text-center text-3xl">
              Upload ProfilePicture:
            </h4>
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files != null) {
                  props.appwriteService.setCurrentUserProfilePicture(
                    event.target.files[0]
                  );
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
