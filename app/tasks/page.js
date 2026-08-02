"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Tasks() {

 const { status } = useSession();

 const router = useRouter();

 const [tasks, setTasks] = useState([]);

 const [title, setTitle] = useState("");

 const [loading, setLoading] = useState(false);



 // ✅ Protect Route and Load Tasks

 useEffect(() => {

  if (status === "unauthenticated") {

   router.push("/");

  }

  if (status === "authenticated") {

   loadTasks();

  }

 }, [status]);


 // ✅ Refresh tasks when page becomes visible

 useEffect(() => {

  const handleVisibilityChange = () => {

   if (document.visibilityState === "visible") {

    loadTasks();

   }

  };

  const handleFocus = () => {

   loadTasks();

  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.addEventListener("focus", handleFocus);

  return () => {

   document.removeEventListener("visibilitychange", handleVisibilityChange);

   window.removeEventListener("focus", handleFocus);

  };

 }, []);



 // ✅ Load Tasks

 async function loadTasks() {

  try {

   const res = await fetch("/api/tasks", {

    cache: "no-store"

   });

   const data = await res.json();

   setTasks(Array.isArray(data) ? data : []);

  }

  catch (error) {

   console.log("Error loading tasks:", error);

  }

 }



 // ✅ Add Task

 async function addTask() {

  const trimmedTitle = title.trim();

  if (!trimmedTitle) return;

  setLoading(true);

  try {

   const res = await fetch("/api/tasks", {

    method: "POST",

    headers: {

     "Content-Type": "application/json"

    },

    body: JSON.stringify({

     title: trimmedTitle,
     subjectId: null,
     deadline: new Date().toISOString()

    })

   });

   if (!res.ok) {

    const error = await res.json();

    throw new Error(error?.error || "Failed to add task");

   }

   const data = await res.json();

   setTitle("");

   setTasks(prev => [...prev, data]);

  }

  catch (error) {

   console.log("Error adding task:", error);

   alert("Failed to add task: " + error.message);

  }

  setLoading(false);

 }



 // ✅ Complete Task

 async function completeTask(id) {

  try {

   const res = await fetch(`/api/tasks/${id}`, {

    method: "PUT"

   });

   if (!res.ok) {

    const error = await res.json();

    throw new Error(error?.error || "Failed to complete task");

   }

   const updatedTask = await res.json();

   setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));

   await loadTasks();

  }

  catch (error) {

   console.log("Error completing task:", error);

   alert("Failed to complete task: " + error.message);

   await loadTasks();

  }

 }



 // ✅ Delete Task

 async function deleteTask(id) {

  try {

   const res = await fetch(`/api/tasks/${id}`, {

    method: "DELETE"

   });

   if (!res.ok) {

    const error = await res.json();

    throw new Error(error?.error || "Failed to delete task");

   }

   setTasks(prev => prev.filter(task => task.id !== id));

   await loadTasks();

  }

  catch (error) {

   console.log("Error deleting task:", error);

   alert("Failed to delete task: " + error.message);

   await loadTasks();

  }

 }



 if (status === "loading") {

  return <p>Loading...</p>;

 }



 return (

  <div className="p-6">


   <h1 className="text-3xl font-bold mb-6">

    Tasks

   </h1>



   {/* Add Task Form */}

   <div className="mb-6">

    <div className="flex gap-4">

     <input

      value={title}

      onChange={(e) => setTitle(e.target.value)}

      onKeyPress={(e) => e.key === "Enter" && addTask()}

      placeholder="Enter task title"

      className="border border-gray-300 p-3 rounded w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"

     />

     <button

      onClick={addTask}

      disabled={loading || !title.trim()}

      className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"

     >

      {loading ? "Adding..." : "Add Task"}

     </button>

    </div>

   </div>



   {/* Task List */}

   <div className="flex flex-col gap-4">

    {tasks.length === 0 ? (

     <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-500">

      No tasks yet. Add one above to get started.

     </div>

    ) : (

     tasks.map(task => (

      <div

       key={task.id}

       className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-lg transition-shadow"

      >

       <div className="flex-1">

        <h2 className="font-bold text-lg">

         {task.title}

        </h2>

        <p

         className={

          task.status === "completed"

           ? "text-green-600 text-sm"

           : "text-red-600 text-sm"

         }

        >

         Status: {task.status}

        </p>

       </div>

       <div className="flex gap-2">

        <button

         onClick={() => completeTask(task.id)}

         disabled={task.status === "completed"}

         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"

        >

         {task.status === "completed" ? "Completed" : "Complete"}

        </button>

        <button

         onClick={() => deleteTask(task.id)}

         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"

        >

         Delete

        </button>

       </div>

      </div>

     ))

    )}

   </div>


  </div>

 );

}