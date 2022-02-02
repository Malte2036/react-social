import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackendService from "../../database/backendService";
import { User } from "../../database/data/user";
import ErrorPage from "../error/ErrorPage";
import useAccount from "../../hooks/AccountHook";

export default function UserPage(props: { backendService: BackendService }) {
  const [account] = useAccount(props.backendService);
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

      setUser(await props.backendService.getUserById(userId));
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
    <>
      <h1 className="pt-6 text-center text-5xl font-extrabold ">
        User: {userId}
      </h1>
      {account.id === user.id && (
        <>
          <h4 className="mt-6 text-center text-3xl">
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
                  props.backendService.setCurrentUserProfilePicture(
                    event.target.files[0]
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
