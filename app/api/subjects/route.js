import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


import prisma from "@/lib/prisma";


// CREATE SUBJECT

export async function POST(request) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({
      error: "Unauthorized"
    });
  }

  const body = await request.json();

  const subject = await prisma.subject.create({

    data: {

      name: body.name,

      userId: session.user.id   // THIS IS REAL USER ID

    }

  });

  return Response.json(subject);

}



// GET ALL SUBJECTS

export async function GET() {

 try {

  const subjects = await prisma.subject.findMany({

   include: {

    tasks: true

   }

  });

  return Response.json(subjects);

 }

 catch (error) {

  return Response.json({

   error: error.message

  });

 }

}