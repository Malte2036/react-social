import { useNavigate } from "react-router-dom";

export default function ErrorPage(props: {
  code: number;
  message: string;
  navigate?: string;
}) {
  let navigate = useNavigate();
  return (
    <div className="h-screen w-screen items-center flex justify-center">
      <h1
        className="cursor-pointer text-center text-5xl font-extrabold"
        onClick={() =>
          navigate(props.navigate !== undefined ? props.navigate : "/home")
        }
      >
        {props.code}-{props.message}
      </h1>
    </div>
  );
}
