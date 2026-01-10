import { Michroma } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${michroma.variable} overflow-x-hidden `}>
        {children}
      </body>
    </html>
  );
}
