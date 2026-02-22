"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }) {

  return (

    <html>

      <body>

        <SessionProvider>

          <Navbar />

          {children}

        </SessionProvider>

      </body>

    </html>

  );

}