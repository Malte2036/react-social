import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Account } from "../../database/data/account";
import AppwriteService from "../../database/appwriteService";
import { User } from "../../database/data/user";
import ErrorPage from "../error/ErrorPage";

export default function UserPage(props: { appwriteService: AppwriteService }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  let navigate = useNavigate();

  const { userId } = useParams();
  if (userId == null) {
    navigate("/home");
    return <></>;
  }

  if (account == null) {
    props.appwriteService.getAccount().then(async (accountFromDatabase) => {
      if (accountFromDatabase === null) {
        navigate("/login");
        return;
      }
      setAccount(accountFromDatabase);

      setUser(await props.appwriteService.getUserById(userId));
    });
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

  if (user === undefined) {
    return <></>;
  }

  return (
    <div className="UserPage">
      <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
        User: {userId}
      </h1>
      {account.$id === user.$id && (
        <>
          <h4 className="mt-6 text-center text-3xl text-gray-900">
            ID: {user!.$write[0].replace("user:", "")}
            <br />
            Email: {account.email}
          </h4>
          <div>
            <h4 className="mt-6 text-center text-3xl text-gray-900">
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
