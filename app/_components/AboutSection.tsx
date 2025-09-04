'use client'

import { client } from '@/lib/sanity.client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

import AboutContent from './(aboutSection)/AboutContent'
import ExperienceContent from './(aboutSection)/ExperienceContent'
import EducationContent from './(aboutSection)/EducationContent'

interface AboutSection {
  profileImage: any
  shortBio: string
  yearsOfExperience?: number
  devYears?: number
  designYears?: number
}

interface WorkExperience {
  _id: string
  role: string
  company: string
  description: string[]
  startDate: string
  endDate: string
  isCurrent: boolean
  location?: string
  techStack?: string[]
  designTools?: string[]
}

interface Education {
  _id: string
  degree: string
  institution: string
  fieldOfStudy: string
  description: string
  startDate: string
  endDate: string
  isCurrent: boolean
}

const AboutSection = () => {
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null)
  const [experiences, setExperiences] = useState<WorkExperience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const aboutQuery = `*[_type == "about"][0]{
          profileImage,
          shortBio,
          yearsOfExperience,
          devYears,
          designYears
        }`
        const aboutData = await client.fetch(aboutQuery)
        setAboutSection(aboutData)

        const expQuery = `*[_type == "workExperience"] | order(startDate desc){
          _id,
          role,
          company,
          description,
          startDate,
          endDate,
          isCurrent,
          location,
          techStack,
          designTools
        }`
        const expData = await client.fetch(expQuery)
        setExperiences(expData)

        const eduQuery = `*[_type == "education"] | order(startDate desc){
          _id,
          degree,
          institution,
          fieldOfStudy,
          description,
          startDate,
          endDate,
          isCurrent
        }`
        const eduData = await client.fetch(eduQuery)
        setEducation(eduData)

      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback data
        setAboutSection({
          profileImage: null,
          shortBio: "Passionate developer creating amazing digital experiences with modern technologies.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !aboutSection) return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4 animate-pulse">
        {/* Image skeleton */}
        <div className="mx-auto w-32 h-32 bg-gray-700/50 rounded-lg"></div>

        {/* Bio skeleton */}
        <div className="space-y-2 max-w-md mx-auto">
          <div className="mx-auto w-full h-4 bg-gray-700/50 rounded"></div>
          <div className="mx-auto w-3/4 h-4 bg-gray-700/50 rounded"></div>
          <div className="mx-auto w-5/6 h-4 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full flex justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-24 lg:mt-[6rem] lg:mb-16">
      <div className="max-w-6xl mx-auto w-full">

        <h2 className="text-3xl lg:text-4xl font-medium leading-tight text-center xl:text-left py-8 lg:mt-16 ">
          About<span className="text-gradient"> Me </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">

          {/* Tab Navigation */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-2 p-1 bg-gray-800/30 rounded-md">
              {[
                { id: "about", label: "About", icon: "👤" },
                { id: "experience", label: "Experience", icon: "💼" },
                { id: "education", label: "Education", icon: "🎓" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer px-4 py-3 text-left transition-all duration-100 flex items-center space-x-2 ${activeTab === tab.id
                      ? "bg-blue-500/10 text-blue-400 border-l-2 border-blue-400"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === "about" && <AboutContent aboutSection={aboutSection} />}
                {activeTab === "experience" && <ExperienceContent experiences={experiences} />}
                {activeTab === "education" && <EducationContent education={education} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
