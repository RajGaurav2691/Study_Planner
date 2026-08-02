import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function DELETE(req, { params }) {

 try {

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {

   return Response.json({ error: "Unauthorized" }, { status: 401 });

  }

  const id = Number(params.id);

  const subject = await prisma.subject.findFirst({

   where: {

    id,
    userId: Number(session.user.id)

   }

  });

  if (!subject) {

   return Response.json({ error: "Subject not found" }, { status: 404 });

  }

  await prisma.task.deleteMany({

   where: { subjectId: id }

  });

  await prisma.subject.delete({

   where: { id }

  });

  return Response.json({

   message: "Deleted"

  });

 }

 catch (error) {

  return Response.json({

   error: error.message

  });

 }

}