import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";

export default function LogoutButton(props: { appwriteService: AppwriteService }) {
  let navigate = useNavigate();

  async function onClickHandler() {
    await props.appwriteService.logout();
    navigate("/login");
  }

  return <button onClick={onClickHandler}>Logout</button>;
}
