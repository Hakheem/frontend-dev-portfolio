import React from "react";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight, Calendar } from "lucide-react";
import { urlFor } from '@/lib/sanity.client';
import usePageTransition from "@/app/hooks/page-transition";

interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  customSlug?: string
  shortDescription: string
  mainImage: any
  links: Array<{
    label: string
    url: string
  }>
  category: string[]
  tags: string[]
  publishDate: string
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, slug, customSlug, shortDescription, mainImage, links, category, tags, publishDate } = project;
  const { navigateWithTransition } = usePageTransition();

  // Determine the project URL - use customSlug if provided, otherwise use default slug
  const getProjectUrl = () => {
    if (customSlug && customSlug.trim()) {
      return `/projects/${customSlug}`;
    }
    return `/projects/${slug.current}`;
  };

  // Find relevant links
  const liveLink = links?.find((link: { label: string; url: string }) =>
    link.label.toLowerCase().includes('live') ||
    link.label.toLowerCase().includes('demo') ||
    link.label.toLowerCase().includes('visit')
  );

  const githubLink = links?.find((link: { label: string; url: string }) =>
    link.label.toLowerCase().includes('github') ||
    link.label.toLowerCase().includes('code') ||
    link.label.toLowerCase().includes('source')
  );

  // Use first category or default
  const mainCategory = category && category.length > 0 ? category[0] : 'Project';

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectUrl = getProjectUrl();

    // Choose a transition effect suitable for project details
    const transitionTypes = ['slide', 'zoom', 'fade'] as const;
    const directions = ['right', 'up'] as const;
    const patterns = ['dots', 'grid'] as const;

    const randomTransition = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

    navigateWithTransition(projectUrl, {
      transitionType: randomTransition,
      direction: randomDirection,
      duration: 600,
      pattern: randomPattern,
      loaderType: 'dots',
      gradient: ['#1e40af', '#3730a3']
    });
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-lg overflow-hidden border border-gray-800/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        {mainImage?.asset ? (
          <Image
            src={urlFor(mainImage).width(500).height(280).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-500">No image</div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="px-3 py-1.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
            {mainCategory}
          </span>
        </div>

      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
          {shortDescription}
        </p>

        {/* Tags */}
        <div className="min-h-[2rem] mb-4">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50 mt-auto">
          <div className="flex items-center gap-3">
            {liveLink && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary text-xs font-medium rounded-lg hover:bg-primary/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
                Code
              </a>
            )}
          </div>

          <button
            onClick={handleDetailsClick}
            className="cursor-pointer flex items-center gap-2 text-primary text-xs font-medium hover:text-primary/80 transition-colors"
          >
            Case Study
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
