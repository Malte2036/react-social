import React from "react";
import Database from "../database/database";

export default function LoginForm(props: { database: Database }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.database.login(email, password);
      alert("Account created");
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
