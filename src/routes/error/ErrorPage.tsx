import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage(props: {
  code: number;
  message: string;
  navigate?: string;
}) {
  let navigate = useNavigate();
  return (
    <div className="ErrorPage">
      <h1
        className="ErrorPageMessage"
        onClick={() =>
          navigate(props.navigate !== undefined ? props.navigate : "/home")
        }
      >
        {props.code}-{props.message}
      </h1>
    </div>
  );
}
