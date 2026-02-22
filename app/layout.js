import "./globals.css";
import Providers from "@/components/providers";

export const metadata = {
  title: "Smart Study Planner",
  description: "Study Planner",
};

export default function RootLayout({ children }) {

  return (

    <html lang="en">

      <body>

        <Providers>

          {children}

        </Providers>

      </body>

    </html>

  );

}