"use client";

import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { client, urlFor } from '@/lib/sanity.client'
import React, { useEffect, useState } from 'react'
import useSmoothScroll from "../hooks/smooth-scroll";

interface Hero {
  profileImage: any
  intro: string
  headline: string
  roles: string[]
  description: string
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const HeroSection = () => {
  const [heroDetails, setHeroDetails] = useState<Hero | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollTo } = useSmoothScroll({
    duration: 1000,
    offset: -120,
    smooth: 'easeInOutQuart'
  });

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('projects');
  };

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('contact');
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setIsLoading(true)
        const query = `*[_type == "hero"][0]{
          profileImage,
          intro,
          headline,
          roles,
          description
        }`

        const data = await client.fetch(query)
        setHeroDetails(data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
        setHeroDetails({
          profileImage: null,
          intro: "Hello, I'm Hector John",
          headline: "Portfolio",
          roles: ["Frontend Developer", "UI Designer"],
          description: "Creating amazing digital experiences"
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Use requestIdleCallback for better performance if available
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => fetchHero())
    } else {
      fetchHero()
    }
  }, [])

  if (isLoading || !heroDetails) return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4 animate-pulse">
        {/* Image skeleton */}
        <div className="mx-auto w-20 h-20 bg-gray-700/50 rounded-full mb-4"></div>

        {/* Badge skeleton */}
        <div className="mx-auto w-28 h-6 bg-gray-700/50 rounded-full"></div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="mx-auto w-72 h-10 bg-gray-700/50 rounded"></div>
          <div className="mx-auto w-56 h-10 bg-gray-700/50 rounded"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-1 max-w-lg mx-auto pt-2">
          <div className="mx-auto w-full h-3 bg-gray-700/50 rounded"></div>
          <div className="mx-auto w-3/4 h-3 bg-gray-700/50 rounded"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <div className="w-32 h-9 bg-gray-700/50 rounded"></div>
          <div className="w-24 h-9 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    </div>
  )

  // dynamic roles 
  const getFormattedTitle = () => {
    if (!heroDetails.roles || heroDetails.roles.length === 0) {
      return "Frontend Developer & UI Designer"
    }

    if (heroDetails.roles.length === 1) {
      return heroDetails.roles[0]
    }

    if (heroDetails.roles.length === 2) {
      return `${heroDetails.roles[0]} & ${heroDetails.roles[1]}`
    }

    return `${heroDetails.roles[0]} & ${heroDetails.roles[1]}`
  }

  return (
    <div className="h-full py-20 lg:py-0 lg:h-screen w-full relative ">

      {/* Contents */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="z-50 h-full flex flex-col items-center justify-center text-center px-4 mt-16 md:mt-20 lg:mt-12 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        {/* Profile Image */}
        <motion.div variants={fadeIn} className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-800/60 flex items-center justify-center overflow-hidden">
            {heroDetails.profileImage && heroDetails.profileImage.asset ? (
              <Image
                src={urlFor(heroDetails.profileImage).width(80).height(80).url()}
                alt={heroDetails.headline || 'Profile'}
                width={80}
                height={80}
                className="w-full h-full object-cover "
                priority
              />
            ) : (
              <Image
                src="/profile.png"
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover "
                priority
              />
            )}
          </div>
        </motion.div>

        {/* Badge/Pill */}
        <motion.div variants={fadeIn}>
          <span className="inline-flex  gap-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-400 text-xs font-normal mb-4 rounded-full">
            <span className="text-yellow-400">✨</span>{heroDetails.intro}
          </span>
        </motion.div>

        {/* Texts */}
        <div className="space-y-2 w-full">
          <motion.div variants={fadeIn}>
            <h1 className="text-gradient text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              {getFormattedTitle()}
            </h1>
          </motion.div>

          <motion.div variants={fadeIn}>
            <p className="text-gray-400 max-w-xl mx-auto text-sm lg:font-light md:text-base leading-relaxed ">
              {heroDetails.description}
            </p>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div variants={fadeIn}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
              className="flex-shrink-0 px-5 py-2 text-sm font-normal rounded-md text-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              Start Your Project
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleViewWork}
              className=" px-5 py-2 text-sm font-normal rounded-md text-gray-300 hover:text-white transition-all duration-200"
            >
              View My Work
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
