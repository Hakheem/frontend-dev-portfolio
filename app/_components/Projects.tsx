"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import { client, urlFor } from '@/lib/sanity.client'
import React, { useEffect, useState } from 'react'
import ProjectCard from "@/components/ProjectCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

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
  publishDate: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const query = `*[_type == "project"] | order(publishDate desc) [0...4] {
          _id,
          title,
          shortDescription,
          mainImage,
          links[] {
            label,
            url
          },
          slug,
          customSlug,
          category,
          publishDate
        }`

        const data = await client.fetch(query)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects data:', error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => fetchProjects())
    } else {
      fetchProjects()
    }
  }, [])

  if (isLoading) {
    return (
      <section className="relative mb-12 xl:mb-48">
        <div className='mx-auto'>
          {/* Texts skeleton */}
          <div className='max-w-[400px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start animate-pulse'>
            <div className="h-10 bg-gray-800/50 rounded mb-6 w-3/4"></div>
            <div className="space-y-2 mb-8 w-full">
              <div className="h-4 bg-gray-800/50 rounded"></div>
              <div className="h-4 bg-gray-800/50 rounded"></div>
              <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800/50 rounded w-4/6"></div>
            </div>
            <div className="h-12 bg-gray-800/50 rounded w-32"></div>
          </div>

          {/* Slider skeleton */}
          <div className='xl:max-w-[700px] xl:absolute right-20 top-0'>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-gray-900/50 rounded-xl h-[520px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative padded lg:mt-[7rem] lg:mb-20 " id='projects' >
      <div className=' mx-auto  '>
        {/* Texts */}
        <div className='max-w-[400px] mx-auto xl:mx-0 text-center xl:text-left mb-12 xl:h-[400px] flex flex-col justify-center items-center xl:items-start space-y-4 '>
          <h2 className="text-3xl lg:text-4xl font-medium leading-tight lg:mt-16 ">
            My Creative <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Explore a selection of my web development projects, ranging from full-stack applications to sleek frontend designs. Each project showcases unique functionality and demonstrates my expertise in crafting user-friendly and responsive web experiences.
          </p>
          <Link href='/projects'>
            <Button className="w-full lg:w-auto">View All Projects</Button>
          </Link>
        </div>

        {/* Slider  */}
        <div className='xl:max-w-[730px] xl:absolute right-20 top-0 '>
          <Swiper
            className='h-[520px] '
            slidesPerView={2}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            {projects.slice(0, 4).map((project) => (
              <SwiperSlide key={project._id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Projects;