import type { Metadata } from "next";
import { Spotlight } from "@/components/ui/spotlight";
import { client } from "@/lib/sanity.client";

interface GenerateMetadataProps {
  params: {
    slug?: string;
  };
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {

  if (!params.slug) {
    return {
      title: "Hector John | Projects",
      description:
        "Frontend Developer and UI/UX Designer focused on building solutions that users love and provide real world solutions. I bridge the gap between compelling design and technical execution, crafting end-to-end digital experiences that are both beautiful and functional.",
    };
  }

  try {

    const project = await client.fetch(`
      *[_type == "project" && slug.current == $slug && (!defined(customSlug) || customSlug == "")][0] {
        title,
        shortDescription
      }
    `, { slug: params.slug });

    if (project) {
      return {
        title: `Hector John | ${project.title}`,
        description: project.shortDescription,
      };
    }
  } catch (error) {
    console.error('Error fetching project metadata:', error);
  }

  // Fallback metadata if project not found
  return {
    title: "Hector John | Project",
    description: "View this project by Hector John - Frontend Developer and UI/UX Designer.",
  };
}

export default function ProjectsLayout({
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