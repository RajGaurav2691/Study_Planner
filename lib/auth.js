import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

 providers: [

     GoogleProvider({

    clientId: process.env.GOOGLE_CLIENT_ID,

    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    }),


  CredentialsProvider({

   name: "credentials",

   credentials: {

    email: {
     label: "Email",
     type: "email"
    },

    password: {
     label: "Password",
     type: "password"
    }

   },

   async authorize(credentials) {

    try {

     // check if email and password provided

     if (!credentials?.email || !credentials?.password) {

      throw new Error("Missing credentials");

     }


     // find user

     const user = await prisma.user.findUnique({

      where: {

       email: credentials.email

      }

     });


     // if user not found

     if (!user) {

      throw new Error("User not found");

     }


     // compare password

     const isValid = await bcrypt.compare(

      credentials.password,
      user.password

     );


     if (!isValid) {

      throw new Error("Invalid password");

     }


     // VERY IMPORTANT: return only required fields

     return {

      id: user.id.toString(),

      name: user.name,

      email: user.email

     };

    }

    catch (error) {

     throw new Error(error.message);

    }

   }

  })

 ],


 session: {

  strategy: "jwt",

 },


 pages: {

  signIn: "/"

 },


 callbacks: {

  async signIn({ user, account }) {

  if (account.provider === "google") {

    let dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: "", // Google users don't use a password
        },
      });
    }

    // Replace Google's ID with your database ID
    user.id = dbUser.id.toString();
  }

  return true;
},

  async jwt({ token, user }) {

   if (user) {

    token.id = user.id;

    token.email = user.email;

    token.name = user.name;

   }

   return token;

  },


  async session({ session, token }) {

   if (token) {

    session.user.id = token.id;

    session.user.email = token.email;

    session.user.name = token.name;

   }

   return session;

  }

 },


 secret: process.env.NEXTAUTH_SECRET

};