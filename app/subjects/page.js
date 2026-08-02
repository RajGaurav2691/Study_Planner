"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subjects(){

 const { status } = useSession();

 const router = useRouter();

 const [subjects, setSubjects] = useState([]);

 const [name, setName] = useState("");

 const [loading, setLoading] = useState(false);


 // Protect Route and Load Subjects

 useEffect(()=>{

  if(status==="unauthenticated"){

   router.push("/");

  }

  if(status==="authenticated"){

   loadSubjects();

  }

 },[status]);


 // Load Subjects

 async function loadSubjects(){

  try {

   const res = await fetch("/api/subjects", {

    cache: "no-store"

   });

   const data = await res.json();

   setSubjects(Array.isArray(data) ? data : []);

  }

  catch (error) {

   console.log(error);

  }

 }


 // Add Subject

 async function addSubject(){

  const trimmedName = name.trim();

  if(!trimmedName) return;

  setLoading(true);

  try {

   const res = await fetch("/api/subjects", {

    method: "POST",

    headers: {

     "Content-Type": "application/json"

    },

    body: JSON.stringify({ name: trimmedName })

   });

   const data = await res.json();

   if(!res.ok || data?.error){

    throw new Error(data?.error || "Failed to add subject");

   }

   setName("");

   await loadSubjects();

  }

  catch (error) {

   console.log(error);

  }

  setLoading(false);

 }


 // Delete Subject

 async function deleteSubject(id){

  try {

   await fetch(`/api/subjects/${id}`, {

    method: "DELETE"

   });

   await loadSubjects();

  }

  catch (error) {

   console.log(error);

  }

 }


 if(status==="loading"){

  return <p>Loading...</p>;

 }


 return(

  <div className="p-6">

   <h1 className="text-3xl font-bold mb-6">

    Subjects

   </h1>

   {/* Add Subject Form */}

   <div className="flex gap-4 mb-6">

    <input

     value={name}

     onChange={(e) => setName(e.target.value)}

     placeholder="Enter subject name"

     className="border p-2 rounded w-64"

    />

    <button

     onClick={addSubject}

     disabled={loading}

     className="bg-purple-600 text-white px-4 py-2 rounded"

    >

     {loading ? "Adding..." : "Add Subject"}

    </button>

   </div>

   {/* Subjects List */}

   <div className="flex flex-col gap-4">

    {subjects.length === 0 ? (

     <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-500">

      No subjects yet. Create one above to get started.

     </div>

    ) : subjects.map(subject => (

     <div

      key={subject.id}

      className="bg-white p-4 rounded shadow flex justify-between items-center"

     >

      <div>

       <h2 className="font-bold text-lg">

        {subject.name}

       </h2>

       <p className="text-gray-600">

        {subject.tasks.length} task{subject.tasks.length !== 1 ? "s" : ""}

       </p>

      </div>

      <button

       onClick={() => deleteSubject(subject.id)}

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