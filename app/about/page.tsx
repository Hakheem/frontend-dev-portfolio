'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import { client, urlFor } from '@/lib/sanity.client';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { Download, Calendar, Code, Palette } from 'lucide-react';

interface AboutData {
  shortBio: string;
  yearsOfExperience?: number;
  devYears?: number;
  designYears?: number;
  content?: ContentBlock[];
  profileImage?: any;
  cvFile?: any;
}

interface ContentBlock {
  _type: string;
  text?: any;
  alt?: string;
  url?: string;
  [key: string]: any;
}

interface PortableTextProps {
  children?: ReactNode;
}

interface LinkProps {
  children?: ReactNode;
  value?: {
    href: string;
  };
}

interface VideoEmbedProps {
  url: string;
}

// Portable Text components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }: PortableTextProps) => <p className="mb-4 text-gray-400 leading-relaxed">{children}</p>,
    h1: ({ children }: PortableTextProps) => <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }: PortableTextProps) => <h2 className="text-2xl font-semibold mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }: PortableTextProps) => <h3 className="text-xl font-medium mb-3 text-gray-900">{children}</h3>,
  },
  marks: {
    strong: ({ children }: PortableTextProps) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }: PortableTextProps) => <em className="italic">{children}</em>,
    link: ({ children, value }: LinkProps) => (
      <a
        href={value?.href || '#'}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// Video embed component
const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
      <iframe
        src={getEmbedUrl(url)}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<string>('medium');

  useEffect(() => {
    const fetchAboutData = async (): Promise<void> => {
      try {
        const query = `*[_type == "about"][0]{
          shortBio,
          yearsOfExperience,
          devYears,
          designYears,
          content,
          profileImage,
          cvFile
        }`;

        const data: AboutData = await client.fetch(query);
        setAboutData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch about data');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Helper function to count consecutive image blocks
  const getImageGroups = (content: ContentBlock[]): ContentBlock[][] => {
    const groups: ContentBlock[][] = [];
    let currentGroup: ContentBlock[] = [];

    content.forEach(block => {
      if (block._type === 'imageBlock') {
        currentGroup.push(block);
      } else {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
          currentGroup = [];
        }
        groups.push([block]);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const renderContentBlock = (block: ContentBlock, index: number): React.ReactElement | null => {
    switch (block._type) {
      case 'paragraph':
        return (
          <div key={index} className="mb-8">
            <PortableText value={block.text} components={portableTextComponents} />
          </div>
        );

      case 'imageBlock':
        // This case is now handled by the image group rendering
        return null;

      case 'video':
        return (
          <div key={index} className="mb-8">
            <VideoEmbed url={block.url || ''} />
          </div>
        );

      default:
        return null;
    }
  };

  const renderImageGroup = (group: ContentBlock[], groupIndex: number): React.ReactElement => {
    const sizeClasses = {
      small: 'max-w-md',
      medium: 'max-w-2xl',
      large: 'max-w-4xl'
    };

    if (group.length === 1) {
      const block = group[0];
      return (
        <div key={`image-${groupIndex}`} className={`mb-8 mx-auto ${sizeClasses[imageSize as keyof typeof sizeClasses]}`}>
          <img
            src={urlFor(block).width(800).quality(80).url()}
            alt={block.alt || 'About content image'}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      );
    } else {
      // Multiple images - display in grid
      return (
        <div key={`image-group-${groupIndex}`} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {group.map((block, index) => (
            <div key={`group-${groupIndex}-img-${index}`}>
              <img
                src={urlFor(block).width(600).quality(80).url()}
                alt={block.alt || 'About content image'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="padded min-h-screen my-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="padded min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold mb-2">Error Loading About Page</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="padded min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-yellow-800 font-semibold mb-2">No About Data Found</h2>
            <p className="text-yellow-600">Please add content to your Sanity Studio.</p>
          </div>
        </div>
      </div>
    );
  }

  // Group content to handle image grids
  const contentGroups = aboutData.content ? getImageGroups(aboutData.content) : [];

  return (
    <div className=" min-h-screen my-16 lg:mt-28 ">
      {/* Image Size Controls */}
      {/* <div className="lg:flex justify-end my-8 space-x-2 hidden mx-[15%]">
        <button 
          onClick={() => setImageSize('small')}
          className={`px-3 py-1 rounded text-xs ${imageSize === 'small' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Small Images
        </button>
        <button 
          onClick={() => setImageSize('medium')}
          className={`px-3 py-1 rounded text-xs ${imageSize === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Medium Images
        </button>
        <button 
          onClick={() => setImageSize('large')}
          className={`px-3 py-1 rounded text-xs ${imageSize === 'large' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Large Images
        </button>
      </div> */}


      {/* Header Section */}
      <div className="mb-12 overflow-hidden w-full">
        <div className="mt-12 px-4 md:px-[7%] lg:px-0 lg:container lg:mx-auto">
          {/* Profile Image  */}
          <div className="mx-auto lg:hidden flex justify-center">
            {aboutData.profileImage && (
              <div className="flex-shrink-0">
                <img
                  src={urlFor(aboutData.profileImage).width(200).height(200).quality(80).url()}
                  alt="Profile"
                  className="w-40 h-40 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          {/* heading & cv */}
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mt-6 lg:px-[12.5%] ">
            {/* Bio and Stats */}
            <h1 className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-gradient text-center md:text-start  lg:max-w-[70%]">
              A little bit about myself
            </h1>

            {/* CV Download */}
            {aboutData.cvFile && (
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                <a
                  href={aboutData.cvFile.asset.url}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-md hover:shadow-lg active:opacity-90 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {aboutData.content && aboutData.content.length > 0 && (
        <div className="text-white mx-[7%] lg:mx-[15%] ">
          <div className="prose prose-lg max-w-none text-white">
            {contentGroups.map((group, index) => {
              if (group[0]._type === 'imageBlock') {
                return renderImageGroup(group, index);
              } else {
                return group.map((block, blockIndex) =>
                  renderContentBlock(block, `${index}-${blockIndex}` as unknown as number)
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;

