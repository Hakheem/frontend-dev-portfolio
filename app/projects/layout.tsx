import React from "react";
import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";


export const metadata: Metadata = {
  title: "Hector John | Projects",
  description:
    "Frontend Developer and UI/UX Designer focused on building solutions that users love and provide real world solutions. I bridge the gap between compelling design and technical execution, crafting end-to-end digital experiences that are both beautiful and functional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden bg-black text-gray-300`}>
        <Spotlight
          className="fixed hidden lg:flex md:left-80 opacity-100 w-full top-0 pointer-events-none z-0"
          fill="white"
        />
        <main className="mx-auto relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
