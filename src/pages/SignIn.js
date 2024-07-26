import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import React from "react";
import { auth,db } from "./Firebase";
import { doc,setDoc } from "firebase/firestore";

export const SignIn = () => {
  
    const [Fname,setFname]=useState("");
    const [Lname,setLname]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");

    const handleSubmit= async (e) => {
        e.preventDefault();
        try{
           await createUserWithEmailAndPassword(auth,Email,Password)
           const user = auth.currentUser;
           if(user){
             const userRef = doc(db, "users", user.uid);
             await setDoc(userRef, {
                 Email: user.email,
                 firstName: Fname,
                 lastName: Lname
             });
           }
           alert( "Account successfully created");
           window.location.href="/ToDoList";
        }catch(e){
            alert(e.message);
        }
    }

    

    return (
      <main class="form-signin">
        <h1 class="h3">SignUp</h1>

        <form onSubmit={handleSubmit}>
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
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="First Name"
              onChange ={(e) => setFname(e.target.value)}
              required
            />
            <label for="floatingInput">First Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Last Name"
              onChange ={(e) => setLname(e.target.value)}
              required
            />
            <label for="floatingInput">Last Name</label>
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
            Sign Up
          </button>
          <p className="mt-5 mb-3 text-muted">
          Already have an account? <a href="/Login">Login</a>
        </p>
        </form>
        <p class="copyright">&copy; 2024</p>
      </main>
    );

};
