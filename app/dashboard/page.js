"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){

 const { data: session, status } = useSession();

 const router = useRouter();

 const [stats,setStats] = useState({

  total:0,
  completed:0,
  pending:0,
  progress:0

 });

 const [loading,setLoading] = useState(true);


 // Protect Route

 useEffect(()=>{

  if(status==="unauthenticated"){

   router.push("/");

  }

  if(status==="authenticated"){

   loadStats();

  }

 },[status]);


 // Refresh stats when page becomes visible

 useEffect(() => {

  const handleVisibilityChange = () => {

   if (document.visibilityState === "visible") {

    setLoading(true);

    loadStats();

   }

  };

  const handleFocus = () => {

   setLoading(true);

   loadStats();

  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.addEventListener("focus", handleFocus);

  return () => {

   document.removeEventListener("visibilitychange", handleVisibilityChange);

   window.removeEventListener("focus", handleFocus);

  };

 }, []);


 async function loadStats(){

  try {

   const res = await fetch("/api/tasks", {

    cache: "no-store"

   });

   const data = await res.json();

   const total = data.length;

   const completed = data.filter(

    task=>task.status==="completed"

   ).length;

   const pending = total-completed;

   const progress = total===0

    ?0

    :Math.floor((completed/total)*100);

   setStats({

    total,
    completed,
    pending,
    progress

   });

   setLoading(false);

  } catch (error) {

   console.log("Error loading stats:", error);

   setLoading(false);

  }

 }


 if(status==="loading" || loading){

  return(

   <div className="flex justify-center items-center h-screen">

    Loading Dashboard...

   </div>

  );

 }


 return(

  <div>


   {/* Header */}

   <div className="flex justify-between items-center mb-6">


    <div>

     <h1 className="text-3xl font-bold">

      Dashboard

     </h1>

     <p className="text-gray-600">

      Welcome, {session.user.name}

     </p>

    </div>


    <div className="flex gap-2">

     <button

      onClick={()=>loadStats()}

      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"

     >

      Refresh

     </button>

     <button

      onClick={()=>signOut({ callbackUrl:"/" })}

      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"

     >

      Logout

     </button>

    </div>


   </div>


   {/* Stats Cards */}

   <div className="grid grid-cols-4 gap-6 mb-6">


    <div className="bg-white p-6 rounded shadow">

     Total Tasks

     <p className="text-2xl font-bold">

      {stats.total}

     </p>

    </div>


    <div className="bg-green-100 p-6 rounded shadow">

     Completed

     <p className="text-2xl font-bold">

      {stats.completed}

     </p>

    </div>


    <div className="bg-red-100 p-6 rounded shadow">

     Pending

     <p className="text-2xl font-bold">

      {stats.pending}

     </p>

    </div>


    <div className="bg-blue-100 p-6 rounded shadow">

     Progress

     <p className="text-2xl font-bold">

      {stats.progress}%

     </p>

    </div>


   </div>


   {/* Progress Bar */}

   <div className="bg-white p-6 rounded shadow mb-6">

    <p className="mb-2">

     Overall Progress

    </p>


    <div className="w-full bg-gray-300 h-4 rounded">


     <div

      className="bg-blue-600 h-4 rounded transition-all"

      style={{width:`${stats.progress}%`}}

     />


    </div>


   </div>


   {/* Navigation Buttons */}

   <div className="flex gap-4">


    <button

     onClick={()=>router.push("/tasks")}

     className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
    >

     Go to Tasks →

    </button>


    <button

     onClick={()=>router.push("/subjects")}

     className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
    >

     Go to Subjects →

    </button>


   </div>


  </div>

 );

}