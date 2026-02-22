import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {

  try {

    const body = await req.json();

    const { name, email, password } = body;

    // check user exists

    const existingUser = await prisma.user.findUnique({

      where: { email }

    });

    if (existingUser) {

      return Response.json({

        message: "User already exists"

      }, { status: 400 });

    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create user

    const user = await prisma.user.create({

      data: {

        name,

        email,

        password: hashedPassword

      }

    });

    return Response.json({

      message: "User created",

      user

    });

  }

  catch (error) {

    return Response.json({

      error: error.message

    });

  }

}