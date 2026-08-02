import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// =======================
// COMPLETE TASK
// =======================
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Next.js 15/16
    const { id } = await params;
    const taskId = Number(id);
    const userId = Number(session.user.id);

    console.log("PUT Task ID:", taskId);

    // Verify task belongs to current user
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        subject: true,
      },
    });

    if (!task) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    if (task.subject.userId !== userId) {
      return Response.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: "completed",
      },
    });

    return Response.json(updatedTask);
  } catch (error) {
    console.error("PUT /api/tasks/[id] error:", error);

    return Response.json(
      {
        error: error.message || "Error updating task",
      },
      {
        status: 500,
      }
    );
  }
}

// =======================
// DELETE TASK
// =======================
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Next.js 15/16
    const { id } = await params;
    const taskId = Number(id);
    const userId = Number(session.user.id);

    console.log("DELETE Task ID:", taskId);

    // Verify task belongs to current user
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        subject: true,
      },
    });

    if (!task) {
      return Response.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    if (task.subject.userId !== userId) {
      return Response.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return Response.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);

    return Response.json(
      {
        error: error.message || "Error deleting task",
      },
      {
        status: 500,
      }
    );
  }
}