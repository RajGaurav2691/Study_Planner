import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {

 providers: [

  CredentialsProvider({

   name: "credentials",

   credentials: {},

   async authorize(credentials) {

    const user = await prisma.user.findUnique({

     where: {

      email: credentials.email

     }

    });

    if (!user) throw new Error("No user");

    const valid = await bcrypt.compare(

     credentials.password,

     user.password

    );

    if (!valid) throw new Error("Wrong password");

    return user;

   }

  })

 ],

 session: {

  strategy: "jwt"

 },

 secret: process.env.NEXTAUTH_SECRET

};