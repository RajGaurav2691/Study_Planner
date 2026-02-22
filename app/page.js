"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Home(){

 const [isLogin,setIsLogin] = useState(true);

 const [name,setName] = useState("");

 const [email,setEmail] = useState("");

 const [password,setPassword] = useState("");

 const [message,setMessage] = useState("");


 async function handleSubmit(){

  if(isLogin){

   const res = await signIn("credentials",{

    email,
    password,
    redirect:false

   });

   if(res.ok){

    window.location.href="/dashboard";

   }

   else{

    setMessage("Invalid credentials");

   }

  }

  else{

   const res = await fetch("/api/users",{

    method:"POST",

    headers:{

     "Content-Type":"application/json"

    },

    body:JSON.stringify({

     name,
     email,
     password

    })

   });

   const data = await res.json();

   setMessage(data.message || "Registered");

   setIsLogin(true);

  }

 }


 return(

  <div className="flex justify-center items-center h-screen bg-gray-100">


   <div className="bg-white shadow-lg p-8 rounded w-96">


    <h1 className="text-2xl font-bold mb-4 text-center">

     {isLogin?"Login":"Register"}

    </h1>


    {!isLogin &&

    <input

     placeholder="Name"

     className="border p-2 w-full mb-3 rounded"

     onChange={(e)=>setName(e.target.value)}

    />

    }


    <input

     placeholder="Gmail"

     className="border p-2 w-full mb-3 rounded"

     onChange={(e)=>setEmail(e.target.value)}

    />


    <input

     type="password"

     placeholder="Password"

     className="border p-2 w-full mb-3 rounded"

     onChange={(e)=>setPassword(e.target.value)}

    />


    <button

     onClick={handleSubmit}

     className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"

    >

     {isLogin?"Login":"Register"}

    </button>


    <p className="text-center mt-4">

     {

      isLogin

      ?

      "Don't have account?"

      :

      "Already have account?"

     }


     <button

      className="text-blue-600 ml-2"

      onClick={()=>setIsLogin(!isLogin)}

     >

      {

       isLogin

       ?

       "Register"

       :

       "Login"

      }

     </button>


    </p>


    <p className="text-center text-red-500 mt-2">

     {message}

    </p>


   </div>


  </div>

 )

}