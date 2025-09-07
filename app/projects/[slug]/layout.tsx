import React from "react";
import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";
import { client } from "@/lib/sanity.client";

interface GenerateMetadataProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  if (!params.slug) {
    return {
      title: "Hector John | Projects",
      description:
        "Frontend Developer and UI/UX Designer focused on building solutions...",
    };
  }

  try {
    const project = await client.fetch(
      `*[_type == "project" && slug.current == $slug && (!defined(customSlug) || customSlug == "")][0] {
        title,
        shortDescription
      }`,
      { slug: params.slug }
    );

    if (project) {
      return {
        title: `Hector John | ${project.title}`,
        description: project.shortDescription,
      };
    }
  } catch (error) {
    console.error("Error fetching project metadata:", error);
  }

  return {
    title: "Hector John | Project",
    description:
      "View this project by Hector John - Frontend Developer and UI/UX Designer.",
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Spotlight
        className="fixed hidden lg:flex md:left-80 opacity-100 w-full top-0 pointer-events-none z-0"
        fill="white"
      />
      <main className="mx-auto relative z-10">{children}</main>
    </>
  );
}
