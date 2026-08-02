import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


// GET TASKS FOR CURRENT USER

export async function GET() {

 try {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {

   return Response.json({ error: "Unauthorized" }, { status: 401 });

  }

  const tasks = await prisma.task.findMany({

   where: {

    subject: {

     userId: Number(session.user.id)

    }

   },

   orderBy: {

    id: "desc"

   }

  });

  return Response.json(tasks);

 }

 catch (error) {

  console.log("GET /api/tasks error:", error);

  return Response.json({ error: error.message || "Error loading tasks" }, { status: 500 });

 }

}


// CREATE TASK

export async function POST(request) {

 try {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {

   return Response.json({ error: "Unauthorized" }, { status: 401 });

  }

  const body = await request.json();
  const title = body.title?.trim();

  if (!title) {

   return Response.json({ error: "Task title is required" }, { status: 400 });

  }

  const userId = Number(session.user.id);
  let subjectId = body.subjectId ? Number(body.subjectId) : null;

  // If no subject ID provided, create or use default "General" subject

  if (!subjectId) {

   let defaultSubject = await prisma.subject.findFirst({

    where: {

     userId,
     name: "General"

    }

   });

   if (!defaultSubject) {

    defaultSubject = await prisma.subject.create({

     data: {

      name: "General",
      userId

     }

    });

   }

   subjectId = defaultSubject.id;

  } else {

   // Verify the subject belongs to the current user

   const subject = await prisma.subject.findFirst({

    where: {

     id: subjectId,
     userId

    }

   });

   if (!subject) {

    return Response.json({ error: "Subject not found or access denied" }, { status: 400 });

   }

  }

  const task = await prisma.task.create({

   data: {

    title,
    subjectId,
    deadline: new Date(body.deadline || new Date()),
    status: "pending"

   }

  });

  return Response.json(task);

 }

 catch (error) {

  console.log("POST /api/tasks error:", error);

  return Response.json({ error: error.message || "Error creating task" }, { status: 500 });

 }

}