import React from "react";
import { useNavigate } from "react-router-dom";
import AppwriteService from "../../database/appwriteService";

export default function LoginForm(props: { appwriteService: AppwriteService }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let navigate = useNavigate();

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.appwriteService.login(email, password);

      navigate("/home");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value)
          }
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
