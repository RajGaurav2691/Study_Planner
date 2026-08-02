"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

 const [isLogin, setIsLogin] = useState(true);

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const [rememberMe, setRememberMe] = useState(false);

 const [message, setMessage] = useState("");


 // ✅ Load saved email automatically

 useEffect(() => {

  const savedEmail = localStorage.getItem("email");

  if (savedEmail) {

   setEmail(savedEmail);
   setRememberMe(true);

  }

 }, []);



 // ✅ Handle Login / Register

 async function handleSubmit() {

  if (isLogin) {

   const res = await signIn("credentials", {

    email,
    password,
    redirect: false,

   });


   if (res.ok) {

    if (rememberMe) {

     localStorage.setItem("email", email);

    } else {

     localStorage.removeItem("email");

    }

    window.location.href = "/dashboard";

   }

   else {

    setMessage("Invalid email or password");

   }

  }


  else {

   const res = await fetch("/api/users", {

    method: "POST",

    headers: {

     "Content-Type": "application/json",

    },

    body: JSON.stringify({

     name,
     email,
     password,

    }),

   });


   const data = await res.json();

   setMessage(data.message || "Registered Successfully");

   setIsLogin(true);

  }

 }



 // ✅ Google Login

 async function handleGoogleLogin() {

  await signIn("google", {

   callbackUrl: "/dashboard",

  });

 }



 return (

  <div className="flex h-screen">




   {/* LEFT SIDE */}


   <div className="w-1/2 flex justify-center items-center bg-white">


    <div className="w-96">



     <h1 className="text-3xl font-bold mb-2">

      Welcome back

     </h1>



     <p className="text-gray-500 mb-6">

      Please enter your details

     </p>



     {/* NAME FIELD */}


     {!isLogin && (

      <input

       type="text"

       placeholder="Name"

       value={name}

       onChange={(e) => setName(e.target.value)}

       className="border p-2 w-full mb-3 rounded"

      />

     )}



     {/* EMAIL */}


     <input

      type="email"

      placeholder="Email address"

      value={email}

      autoComplete="email"

      onChange={(e) => setEmail(e.target.value)}

      className="border p-2 w-full mb-3 rounded"

     />



     {/* PASSWORD */}


     <input

      type="password"

      placeholder="Password"

      autoComplete="current-password"

      onChange={(e) => setPassword(e.target.value)}

      className="border p-2 w-full mb-3 rounded"

     />


{/* REMEMBER ME + FORGOT PASSWORD */}

<div className="flex justify-between items-center mb-4">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
    />

    Remember me

  </label>

  <Link
    href="/forgot-password"
    className="text-purple-600 hover:underline text-sm font-medium"
  >
    Forgot Password?
  </Link>

</div>



     {/* LOGIN BUTTON */}


     <button

      onClick={handleSubmit}

      className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 mb-3"

     >

      {isLogin ? "Sign in" : "Register"}

     </button>



     {/* GOOGLE LOGIN */}


     <button

      onClick={handleGoogleLogin}

      className="border w-full py-2 rounded flex justify-center items-center gap-2 hover:bg-gray-100"

     >

      <Image

       src="/google.png"

       width={20}

       height={20}

       alt="google"

      />

      Sign in with Google

     </button>



     {/* TOGGLE LOGIN REGISTER */}


     <p className="mt-4 text-center">


      {

       isLogin

        ? "Don't have account?"

        : "Already have account?"

      }



      <button

       onClick={() => setIsLogin(!isLogin)}

       className="text-purple-600 ml-2"

      >

       {

        isLogin

         ? "Sign up"

         : "Sign in"

       }

      </button>


     </p>



     {/* MESSAGE */}


     <p className="text-red-500 text-center mt-2">

      {message}

     </p>



    </div>


   </div>




   {/* RIGHT SIDE */}



   <div className="w-1/2 bg-gradient-to-r from-purple-500 to-purple-300 flex justify-center items-center">


    <Image

     src="/study.png"

     width={400}

     height={400}

     alt="study"

    />


   </div>




  </div>

 );

}