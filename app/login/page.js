"use client";

import { signIn } from "next-auth/react";

export default function Login() {

 const handleLogin = async () => {

  await signIn("credentials", {

   email: "test@gmail.com",

   password: "123456",

   redirect: true,

   callbackUrl: "/dashboard"

  });

 };

 return (

  <div>

   <h1>Login</h1>

   <button onClick={handleLogin}>

    Login

   </button>

  </div>

 );

}