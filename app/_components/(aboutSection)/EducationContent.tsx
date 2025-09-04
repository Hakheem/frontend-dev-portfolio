import { motion } from "framer-motion"
import { Calendar, GraduationCap } from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card";


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

interface EducationContentProps {
  education: Education[]
}

const EducationContent = ({ education }: EducationContentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const getDuration = (startDate: string, endDate: string | null, isCurrent: boolean) => {
    const start = new Date(startDate)
    const end = isCurrent ? new Date() : new Date(endDate as string)
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) return `${remainingMonths} mos`
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'yr' : 'yrs'}`
    return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} mos`
  }

  return (
    <div className="space-y-8">

      <div className="grid gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}

          >
            <MagicCard className="p-5 rounded-xl" >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <div className="flex items-center text-blue-400 mt-1">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>{edu.institution}</span>
                  </div>
                  {edu.fieldOfStudy && (
                    <div className="text-gray-300 mt-1">{edu.fieldOfStudy}</div>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-400 whitespace-nowrap">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    {formatDate(edu.startDate)} - {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{getDuration(edu.startDate, edu.isCurrent ? null : edu.endDate, edu.isCurrent)}</span>
                </div>
              </div>

              {edu.description && (
                <p className="text-gray-300 mt-3">{edu.description}</p>
              )}
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EducationContent