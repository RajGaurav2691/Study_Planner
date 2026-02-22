

"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
 const { data: session } = useSession();

 if (!session) {
    return <div>Please login</div>;
 }

 const [tasks, setTasks] = useState([]);

 const [total, setTotal] = useState(0);

 const [completed, setCompleted] = useState(0);

 const [pending, setPending] = useState(0);

 const [progress, setProgress] = useState(0);



 useEffect(() => {

  loadDashboard();

 }, []);



 const loadDashboard = async () => {

  const res = await fetch("/api/tasks");

  const data = await res.json();

  setTasks(data);



  const totalTasks = data.length;

  const completedTasks = data.filter(

   task => task.status === "completed"

  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progressPercent = totalTasks === 0

   ? 0

   : Math.floor((completedTasks / totalTasks) * 100);



  setTotal(totalTasks);

  setCompleted(completedTasks);

  setPending(pendingTasks);

  setProgress(progressPercent);

 };



 return (

  <div style={{ padding: "20px" }}>

   <h1>Dashboard</h1>


   <h3>Total Tasks: {total}</h3>

   <h3>Completed: {completed}</h3>

   <h3>Pending: {pending}</h3>



   <h3>Progress: {progress}%</h3>



   <div style={{

    width: "300px",

    height: "20px",

    border: "1px solid black"

   }}>

    <div style={{

     width: `${progress}%`,

     height: "100%",

     backgroundColor: "green"

    }}>

    </div>

   </div>



   <h2>Recent Tasks</h2>


   {tasks.map(task => (

    <div key={task.id}>

     {task.title}

     {" | "}

     {task.status}

    </div>

   ))}



  </div>

 );

}