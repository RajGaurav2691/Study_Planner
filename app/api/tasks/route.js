import prisma from "@/lib/prisma";


// CREATE TASK

export async function POST(req) {

 try {

  const body = await req.json();

  const { title, subjectId, deadline } = body;

  const task = await prisma.task.create({

   data: {

    title,

    status: "pending",

    deadline: new Date(deadline),

    subjectId: Number(subjectId)

   }

  });

  return Response.json(task);

 }

 catch (error) {

  return Response.json({

   error: error.message

  });

 }

}



// GET ALL TASKS

export async function GET() {

 try {

  const tasks = await prisma.task.findMany({

   include: {

    subject: true

   }

  });

  return Response.json(tasks);

 }

 catch (error) {

  return Response.json({

   error: error.message

  });

 }

}