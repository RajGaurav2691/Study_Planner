"use client";

import { useEffect, useState } from "react";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>

      <h1>Tasks</h1>

      {tasks.map(task => (

        <div key={task.id}>

          <p>{task.title}</p>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>
  );

}