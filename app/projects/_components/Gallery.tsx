'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { urlFor } from '@/lib/sanity.client';

interface GalleryProps {
  images: any[];
  title: string;
}

const Gallery = ({ images, title }: GalleryProps) => {
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
  useEffect(() => {
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

export default Gallery;
