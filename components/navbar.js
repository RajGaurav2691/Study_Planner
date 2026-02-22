"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {

  return (

    <button onClick={() => signOut()}>

      Logout

    </button>

  );

}