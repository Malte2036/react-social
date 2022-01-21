import React from "react";
import Database from "../database/database";

export default function RegisterForm(props: { database: Database }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await props.database.createAccount(email, username, password);
      alert("Account created");
    } catch (error) {
      alert(`Error ${error}`);
    }
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          required
        />
      </div>
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
