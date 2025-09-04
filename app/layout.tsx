import React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/spotlight";
import { Toaster } from "sonner";
import { client } from '@/lib/sanity.client';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hector John | Frontend Developer & UI Designer",
  description:
    "Frontend Developer and UI/UX Designer focused on building solutions that users love and provide real world solutions. I bridge the gap between compelling design and technical execution, crafting end-to-end digital experiences that are both beautiful and functional.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
      {
        url: "/favicon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/favicon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/favicon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
  keywords: [
    "Frontend Developer",
    "Web Developer",
    "UI/UX Design",
    "React",
    "Next.js",
    "Python",
    "Web Developer Portfolio",
    "Fullstack Developer",
  ],
  authors: [{ name: "Hector John" }],
  creator: "Hector John",
};

// Fetch contact data
async function getContactData() {
  const query = `*[_type == "contact"][0] {
    email,
    phone,
    location,
    socials[] {
      platform,
      url
    }
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactData = await getContactData();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased overflow-x-hidden bg-black text-gray-300`}>
        <Spotlight
          className="fixed hidden lg:flex md:left-80 opacity-100 w-full top-0 pointer-events-none z-0"
          fill="white"
        />
        <Navbar />
        <main className="mx-auto relative z-10">
          {children}
        </main>
          <Toaster />
        <Footer contactData={contactData} />
      </body>
    </html>
  );
}

