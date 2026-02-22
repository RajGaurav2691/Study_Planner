"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tasks(){

 const { status } = useSession();

 const router = useRouter();

 const [tasks,setTasks] = useState([]);

 const [title,setTitle] = useState("");


 useEffect(()=>{

  if(status==="unauthenticated"){

   router.push("/");

  }

  if(status==="authenticated"){

   loadTasks();

  }

 },[status]);


 async function loadTasks(){

  const res = await fetch("/api/tasks");

  const data = await res.json();

  setTasks(data);

 }


 async function addTask(){

  if(!title) return;

  await fetch("/api/tasks",{

   method:"POST",

   headers:{

    "Content-Type":"application/json"

   },

   body:JSON.stringify({

    title,

    subjectId:1,

    deadline:new Date()

   })

  });

  setTitle("");

  loadTasks();

 }


 async function completeTask(id){

  await fetch(`/api/tasks/${id}`,{

   method:"PUT"

  });

  loadTasks();

 }


 async function deleteTask(id){

  await fetch(`/api/tasks/${id}`,{

   method:"DELETE"

  });

  loadTasks();

 }


 if(status==="loading"){

  return <p>Loading...</p>;

 }


 return(

  <div>

   <h1 className="text-3xl font-bold mb-6">

    Tasks

   </h1>


   {/* Add Task */}

   <div className="flex gap-4 mb-6">

    <input

     value={title}

     onChange={(e)=>setTitle(e.target.value)}

     placeholder="Enter task"

     className="border p-2 rounded w-64"

    />


    <button

     onClick={addTask}

     className="bg-blue-600 text-white px-4 py-2 rounded"

    >

     Add Task

    </button>


   </div>


   {/* Task List */}

   <div className="grid grid-cols-3 gap-4">


    {tasks.map(task=>(

     <div key={task.id}

     className="bg-white p-4 rounded shadow">

      <h2 className="font-bold">

       {task.title}

      </h2>


      <p className={

       task.status==="completed"

       ?"text-green-600"

       :"text-red-600"

      }>

       {task.status}

      </p>


      <button

       onClick={()=>completeTask(task.id)}

       className="bg-green-500 text-white px-3 py-1 rounded mr-2 mt-2"

      >

       Complete

      </button>


      <button

       onClick={()=>deleteTask(task.id)}

       className="bg-red-500 text-white px-3 py-1 rounded"

      >

       Delete

      </button>


     </div>

    ))}


   </div>


  </div>

 )

}