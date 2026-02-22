import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {

 try {

  const id = Number(params.id);

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