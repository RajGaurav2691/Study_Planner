"use client";

import { useState } from "react";

export default function Register() {

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = async () => {

  await fetch("/api/users", {

   method: "POST",

   body: JSON.stringify({

    name,

    email,

    password

   })

  });

  alert("User Registered");

 };

 return (

  <div>

   <h1>Register</h1>

   <input placeholder="Name"

    onChange={(e)=>setName(e.target.value)}

   />

   <input placeholder="Email"

    onChange={(e)=>setEmail(e.target.value)}

   />

   <input placeholder="Password"

    onChange={(e)=>setPassword(e.target.value)}

   />

   <button onClick={handleSubmit}>

    Register

   </button>

  </div>

 );

}