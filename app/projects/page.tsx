"use client";

import Button from "@/components/ui/button";
import React, { useEffect, useState } from 'react'
import { client } from '@/lib/sanity.client'
import ProjectCard from './_components/ProjectCard'
import ProjectsCta from "./_components/ProjectsCta";

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProjects, setTotalProjects] = useState(0)
  const projectsPerPage = 6

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)

        // Calculate offset for pagination
        const offset = (currentPage - 1) * projectsPerPage

        // Always sort by publishDate (newest first)
        const query = `*[_type == "project"] | order(publishDate desc) [${offset}...${offset + projectsPerPage}] {
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
          tags,
          publishDate
        }`

        // Query for total count
        const countQuery = `count(*[_type == "project"])`

        const [data, count] = await Promise.all([
          client.fetch(query),
          client.fetch(countQuery)
        ])

        setProjects(data)
        setTotalProjects(count)
      } catch (error) {
        setProjects([])
        setTotalProjects(0)
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => fetchProjects())
    } else {
      fetchProjects()
    }
  }, [currentPage])

  if (isLoading) {
    return (
      <div className='min-h-screen padded mb-28'>

        {/* Texts */}
        <div className='max-w-3xl mt-28 mx-auto xl:mx-0 text-center xl:text-left mb-12 flex flex-col justify-center items-center xl:items-start space-y-4 '>
          <h2 className="text-3xl lg:text-4xl font-medium leading-tight h-4 bg-gray-800/70 w-full animate-ring ">
          </h2>
          <p className=" h-3 bg-gray-800/70 w-full animate-ring "></p>
          <p className=" h-3 bg-gray-800/70 w-1/2 animate-ring "></p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="group bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-lg overflow-hidden border border-gray-800/50">
                {/* Image skeleton */}
                <div className="relative h-60 bg-gray-800"></div>

                {/* Content skeleton */}
                <div className="p-6 animate-ring">
                  <div className="h-6 bg-gray-800 rounded mb-3"></div>
                  <div className="space-y-2 mb-5">
                    <div className="h-4 bg-gray-800/70 rounded"></div>
                    <div className="h-4 bg-gray-800/70 rounded w-3/4"></div>
                  </div>

                  {/* Action buttons skeleton */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-20 bg-gray-800/70 rounded-lg"></div>
                      <div className="h-8 w-16 bg-gray-800/70 rounded-lg"></div>
                    </div>
                    <div className="h-8 w-16 bg-gray-800/70 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-20">

      <div className='min-h-screen padded '>
        {/* Texts */}
        <div className='max-w-3xl mt-28 mb-12 mx-auto xl:mx-0 text-center xl:text-left flex flex-col justify-center items-center xl:items-start space-y-4 '>
          <h2 className="text-3xl lg:text-4xl font-semibold leading-tight  ">
            My Creative <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A showcase of my development work spanning web applications, UI/UX designs, and full-stack solutions. Each project represents a unique challenge solved with modern technologies and attention to detail.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {/* Pagination */}
          {totalProjects > projectsPerPage && (
            <div className="flex justify-center items-center my-12 space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-4 py-2"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.ceil(totalProjects / projectsPerPage) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={isLoading}
                    className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? 'bg-blue-500/70 text-primary-foreground'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalProjects / projectsPerPage)))}
                disabled={currentPage === Math.ceil(totalProjects / projectsPerPage) || isLoading}
                className="px-4 py-2"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>


      <ProjectsCta />


    </div>
  )
}

export default ProjectsPage

