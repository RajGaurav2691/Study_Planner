import prisma from "@/lib/prisma";


// DELETE TASK

export async function DELETE(req, { params }) {

 try {

  const id = Number(params.id);

  await prisma.task.delete({

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



// UPDATE TASK STATUS

export async function PUT(req, { params }) {

 try {

  const id = Number(params.id);

  await prisma.task.update({

   where: { id },

   data: {

    status: "completed"

   }

  });

  return Response.json({

   message: "Updated"

  });

 }

 catch (error) {

  return Response.json({

   error: error.message

  });

 }

}