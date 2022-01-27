import { useNavigate } from "react-router-dom";
import AppwriteService from "../database/appwriteService";

export default function LogoutButton(props: {
  appwriteService: AppwriteService;
}) {
  let navigate = useNavigate();

  async function onClickHandler() {
    await props.appwriteService.logout();
    navigate("/login");
  }

  return (
    <button
      onClick={onClickHandler}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Logout
    </button>
  );
}
