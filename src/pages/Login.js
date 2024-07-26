import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth, db } from "./Firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      alert("Logged in successfully");
      window.location.href="/ToDoList";
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <main class="form-signin">
      <h1 class="h3">Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange ={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange ={(e) => setPassword(e.target.value)}
            required
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              value="1"
              name="remember_me"
              id="rememberMeSwitch"
            />
            <label class="form-check-label" for="rememberMeSwitch">
              {" "}
              Remember me
            </label>
          </div>
        </div>
        <button class="w-100 btn btn-lg" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">
          Don't have an account? <a href="/">SignUp</a>
        </p>
      </form>
      <p class="copyright">&copy; 2024</p>
    </main>
  );
};
