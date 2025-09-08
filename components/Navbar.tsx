"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { House, Folder, Mail, Download, X, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Button from "./ui/button"
import { client } from '@/lib/sanity.client'

const navigationLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/projects", label: "Projects", icon: Folder },
  { href: "/contact", label: "Contact", icon: Mail },
]

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cvUrl, setCvUrl] = useState<string | null>(null)
  const pathname = usePathname()

  // Fetch CV URL from Sanity
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const query = `*[_type == "about"][0] {
          cvFile {
            asset-> {
              url,
              originalFilename
            }
          }
        }`
        
        const data = await client.fetch(query)
        if (data?.cvFile?.asset?.url) {
          setCvUrl(data.cvFile.asset.url)
        }
      } catch (error) {
      }
    }

    fetchCV()
  }, [])

  const downloadCV = () => {
    if (!cvUrl) {
      return
    }

    const link = document.createElement('a')
    link.href = cvUrl
    link.download = 'Hector John CV.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] lg:w-[82%] ">
      <nav className="backdrop-blur-md bg-[#121212] border border-gray-700/50 rounded-lg shadow-sm h-16 lg:h-18 grid grid-cols-3 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="relative h-12 w-12 overflow-hidden rounded-full md:h-10 md:w-10">
              <Image
                src='/favicon.png'
                alt='Logo'
                fill
                sizes="(max-width: 768px) 40px, 36px"
                className="object-cover"
                priority
              />
            </div>
            <span className="hidden font-bold sm:inline-block">Hector</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex justify-center">
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-2.5 rounded-md cursor-pointer ${isActive
                    ? "text-primary bg-primary/15 border border-primary/20"
                    : "text-muted-foreground hover:text-gray-300 hover:bg-primary/20"
                    }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Download CV Button and Mobile Menu */}
        <div className="flex justify-end">
          <nav className="flex items-center gap-1">
            {/* Download CV Button */}
            <Button
              onClick={downloadCV}
              disabled={!cvUrl}
              className={`hidden md:flex items-center gap-2 py-2.5 px-4 cursor-pointer ${!cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
              variant='outline'
            >
              <Download size={16} />
              <span>Download CV</span>
            </Button>

            <Button
              onClick={downloadCV}
              disabled={!cvUrl}
              className={`md:hidden flex items-center gap-2 cursor-pointer ${!cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
              size="sm"
            >
              <Download size={16} />
              <span className="sm:hidden">CV</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden cursor-pointer h-9 px-2.5 backdrop-blur-sm hover:bg-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={25} />
              <span className="sr-only">Open menu</span>
            </Button>
          </nav>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 min-h-screen md:hidden cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed inset-0 z-50 w-full min-h-screen bg-[#121212] p-5 md:hidden flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 min-h-[30px] pb-4 border-b">
                <Link
                  href="/"
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src='/favicon.png'
                      alt='Logo'
                      fill
                      sizes="36px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span className="font-bold text-md">Hector John</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-md h-9 w-9 cursor-pointer"
                >
                  <X size={20} />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 flex-1">
                {navigationLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 py-3 px-3 rounded-md text-base font-medium transition-all cursor-pointer ${isActive
                          ? "text-primary bg-primary/15 border-l-4 border-primary"
                          : "text-muted-foreground hover:bg-primary/70 hover:text-gray-300"
                          }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Bottom Section with Download Button and Copyright */}
              <div className="mt-auto">
                {/* Download CV Button */}
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => {
                      downloadCV()
                      setSidebarOpen(false)
                    }}
                    disabled={!cvUrl}
                    className={`w-full flex items-center justify-center gap-2 py-4 text-base rounded-md cursor-pointer ${!cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                    size="lg"
                  >
                    <Download size={18} />
                    Download CV
                  </Button>
                </div>

                {/* Copyright */}
                <div className="pt-4 border-t mt-4">
                  <p className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Hector John
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

