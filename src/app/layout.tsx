import type { Metadata } from "next";
import "./globals.css";

import { spaceGrotesk, satoshi, satoshiVariable } from "./fonts";

export const metadata: Metadata = {
  title: "WEBBED",
  description: "Digital solutions and AI systems for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${satoshi.variable} ${satoshiVariable.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
