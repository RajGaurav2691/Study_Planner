"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Subjects(){

 const { status } = useSession();

 const router = useRouter();


 useEffect(()=>{

  if(status==="unauthenticated"){

   router.push("/");

  }

 },[status]);


 if(status==="loading"){

  return <p>Loading...</p>;

 }


 return(

  <div>

   <h1 className="text-3xl font-bold">

    Subjects Page

   </h1>

  </div>

 )

}