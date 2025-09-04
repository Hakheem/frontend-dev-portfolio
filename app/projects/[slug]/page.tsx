'use client'

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity.client';
import Image from 'next/image';
import { ExternalLink, Github, ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import ProjectsCta from '../_components/ProjectsCta';

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  customSlug?: string;
  shortDescription: string;
  longDescription: any;
  mainImage: any;
  gallery: any[];
  links: Array<{
    label: string;
    url: string;
  }>;
  tags: string[];
  category: string[];
  publishDate: string;
}

interface SlugPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug && (!defined(customSlug) || customSlug == "")][0] {
    _id,
    title,
    slug,
    customSlug,
    shortDescription,
    longDescription,
    mainImage,
    gallery,
    links[] {
      label,
      url
    },
    tags,
    category,
    publishDate
  }`;

  return await client.fetch(query, { slug });
}

const SlugPage = async ({ params }: SlugPageProps) => {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  // links
  const liveLink = project.links?.find((link) =>
    link.label.toLowerCase().includes('live') ||
    link.label.toLowerCase().includes('demo') ||
    link.label.toLowerCase().includes('visit')
  );

  const githubLink = project.links?.find((link) =>
    link.label.toLowerCase().includes('github') ||
    link.label.toLowerCase().includes('code') ||
    link.label.toLowerCase().includes('source')
  );

  const mainCategory = project.category && project.category.length > 0 ? project.category[0] : 'Project';

  return (
<div className='bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-gray-300'>
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        
        <div className="relative padded py-20 lg:py-32">
          {/* Back Button */}
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="inline-block">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full border border-primary/30">
                    {mainCategory}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient leading-tight">
                  {project.title}
                </h1>

                {/* Short Description */}
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {liveLink && (
                    <a
                      href={liveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <ExternalLink size={18} className="relative z-10" />
                      <span className="relative z-10">View Live Project</span>
                    </a>
                  )}
                  {githubLink && (
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors border border-gray-700 group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <Github size={18} className="relative z-10" />
                      <span className="relative z-10">View Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Main Image */}
              <div className="relative">
                {project.mainImage?.asset ? (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
                    <Image
                      src={urlFor(project.mainImage).width(800).height(600).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800/50 flex items-center justify-center">
                    <div className="text-gray-500">No image available</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="padded py-20">
        <div className="max-w-5xl mx-auto">
          {/* Long Description */}
          {project.longDescription && (
            <div className="prose prose-invert prose-lg max-w-none mb-16">
              <h2 className="text-2xl text-gradient font-semibold mb-6">About This Project</h2>
              <div className="text-gray-400 leading-relaxed">
                <PortableText value={project.longDescription} />
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl text-gradient font-semibold mb-8">Project Gallery</h2>
              <Gallery images={project.gallery} title={project.title} />
            </div>
          )}

          {/* Additional Links */}
          {project.links && project.links.length > 2 && (
            <div className="border-t border-gray-800/50 pt-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Related Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.links
                  .filter(link => 
                    !link.label.toLowerCase().includes('live') &&
                    !link.label.toLowerCase().includes('demo') &&
                    !link.label.toLowerCase().includes('visit') &&
                    !link.label.toLowerCase().includes('github') &&
                    !link.label.toLowerCase().includes('code') &&
                    !link.label.toLowerCase().includes('source')
                  )
                  .map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800/50 rounded-lg hover:border-gray-700 transition-colors group hover:bg-gray-800/30"
                    >
                      <ExternalLink size={16} className="text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Add spacing at the bottom */}
    <div className="py-12">
      <ProjectsCta />
    </div>
</div>
  );
};

// Gallery Component with the layout logic you requested
const Gallery = ({ images, title }: { images: any[], title: string }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scrolling
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      if (e.key === 'ArrowRight') setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, images.length]);

  // Render different layouts based on number of images
  const renderGalleryLayout = () => {
    switch (images.length) {
      case 1:
        return (
          <div className="grid grid-cols-1 gap-6">
            <div 
              className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={urlFor(images[0]).width(1200).height(800).url()}
                alt={`${title} gallery image 1`}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={urlFor(image).width(800).height(600).url()}
                  alt={`${title} gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={urlFor(image).width(600).height(600).url()}
                  alt={`${title} gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First two images - equal size */}
            {images.slice(0, 2).map((image, index) => (
              <div 
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={urlFor(image).width(800).height(600).url()}
                  alt={`${title} gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Second row - one slightly larger */}
            <div 
              className="relative aspect-video md:col-span-2 rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
              onClick={() => openLightbox(2)}
            >
              <Image
                src={urlFor(images[2]).width(1200).height(600).url()}
                alt={`${title} gallery image 3`}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
            </div>
            
            <div 
              className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
              onClick={() => openLightbox(3)}
            >
              <Image
                src={urlFor(images[3]).width(600).height(600).url()}
                alt={`${title} gallery image 4`}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-1 gap-6">
              {images.slice(0, 2).map((image, index) => (
                <div 
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={urlFor(image).width(500).height(500).url()}
                    alt={`${title} gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div 
              className="relative aspect-video md:aspect-square md:col-span-2 rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
              onClick={() => openLightbox(2)}
            >
              <Image
                src={urlFor(images[2]).width(800).height(800).url()}
                alt={`${title} gallery image 3`}
                fill
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ZoomIn size={20} className="text-white" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:col-span-3 gap-6 mt-6">
              {images.slice(3, 5).map((image, index) => (
                <div 
                  key={index + 3}
                  className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                  onClick={() => openLightbox(index + 3)}
                >
                  <Image
                    src={urlFor(image).width(600).height(400).url()}
                    alt={`${title} gallery image ${index + 4}`}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-800/50 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={urlFor(image).width(600).height(400).url()}
                  alt={`${title} gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <>
      {renderGalleryLayout()}
      
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/70 rounded-full p-2"
          >
            <X size={28} />
          </button>
          
          <button 
            onClick={goToPrevious}
            className="absolute left-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/70 rounded-full p-3"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/70 rounded-full p-3"
          >
            <ChevronRight size={32} />
          </button>
          
          <div 
            className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[currentImageIndex]).width(1200).url()}
              alt={`${title} gallery image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          
          <div className="absolute bottom-6 text-white text-center w-full text-lg">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default SlugPage;

