import { useNavigate } from "react-router-dom";
import Database from "../database/database";

export default function LogoutButton(props: { database: Database }) {
  let navigate = useNavigate();

  async function onClickHandler() {
    await props.database.logout();
    navigate("/login");
  }

  return <button onClick={onClickHandler}>Logout</button>;
}
