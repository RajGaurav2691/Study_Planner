import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// CREATE SUBJECT
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const userId = Number(session.user.id);

    if (isNaN(userId)) {
      return Response.json(
        { error: "Invalid user id" },
        { status: 400 }
      );
    }

    const subject = await prisma.subject.create({
      data: {
        name: body.name.trim(),
        userId: userId,
      },
    });

    return Response.json(subject);
  } catch (error) {
    console.error("POST /api/subjects error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}