import Image from "next/image";
import Link from "next/link";
import { urlFor, client } from '@/lib/sanity.client'
import { useEffect, useState } from 'react'
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

interface AboutSection {
  profileImage: any
  shortBio: string
  yearsOfExperience?: number
  devYears?: number
  designYears?: number
}

interface Social {
  platform: string
  url: string
}

interface AboutContentProps {
  aboutSection: AboutSection
}

const AboutContent = ({ aboutSection }: AboutContentProps) => {
  const [socials, setSocials] = useState<Social[]>([])

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const query = `*[_type == "contact"][0]{
        socials[]{
          platform,
          url
        }
      }`
        const data = await client.fetch(query)

        setSocials(data?.socials || [])
      } catch (error) {
        console.error('Error fetching socials:', error)
      }
    }

    fetchSocials()
  }, [])

  const getSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5"
    const normalizedPlatform = platform.toLowerCase().trim()

    switch (normalizedPlatform) {
      case 'email':
        return <MdOutlineMarkEmailUnread className={iconClass} />
      case 'github':
        return <FaGithub className={iconClass} />
      case 'linkedin':
        return <FaLinkedin className={iconClass} />
      case 'whatsapp':
        return <FaWhatsapp className={iconClass} />
      case 'twitter':
        return <FaXTwitter className={iconClass} />
      default:
        console.log('No icon found for platform:', platform)
        return null
    }
  }

  return (
    <div className="space-y-4">

     <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
  {/* Image section */}
  <div className="col-span-2 flex justify-center md:block">
    <div className="h-full rounded-lg overflow-hidden border-2 border-gray-700/50">
      {aboutSection.profileImage && aboutSection.profileImage.asset ? (
        <Image
          src={urlFor(aboutSection.profileImage).url()}
          alt="Profile"
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center aspect-square">
          <span className="text-4xl">👤</span>
        </div>
      )}
    </div>
  </div>

  {/* Text content section */}
  <div className="col-span-3">
    <div className="flex flex-col items-start space-y-3">
      <p className="text-gray-400 leading-relaxed ">
        {aboutSection.shortBio.split('more about me').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <Link
                href="/about"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200 ml-1"
              >
                more about me
              </Link>
            )}
          </span>
        ))}
      </p>

      {/* Social icons */}
      {socials.length > 0 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-3">
            {socials.map((social, index) => {
              const icon = getSocialIcon(social.platform)

              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-2 rounded-full border border-gray-700/30 hover:border-blue-400/30"
                >
                  {icon}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

    </div>
  )
}

export default AboutContent
