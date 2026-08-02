import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/mail";

export async function POST(request) {
  try {
    const { email } = await request.json();

    console.log("========== FORGOT PASSWORD ==========");
    console.log("Email:", email);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("User:", user);

    if (!user) {
      console.log("User not found");

      return Response.json({
        message:
          "If an account exists, a reset email has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    console.log("Generated Token:", token);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken: token,
        resetTokenExpiresAt: new Date(
          Date.now() + 15 * 60 * 1000
        ),
      },
    });

    console.log("Token saved to database.");

    console.log("Sending email...");

    await sendResetEmail(email, token);

    console.log("Email sent successfully.");

    return Response.json({
      message: "Reset email sent.",
    });

  } catch (error) {

    console.error("========== FORGOT PASSWORD ERROR ==========");
    console.error(error);

    return Response.json(
      {
        error: error.message,
        stack: error.stack,
      },
      {
        status: 500,
      }
    );
  }
}