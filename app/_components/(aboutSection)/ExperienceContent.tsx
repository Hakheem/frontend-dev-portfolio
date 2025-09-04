import { motion } from "framer-motion"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import { MagicCard } from "@/components/magicui/magic-card";


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

interface ExperienceContentProps {
    experiences: WorkExperience[]
}

const ExperienceContent = ({ experiences }: ExperienceContentProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
    }

    const getDuration = (startDate: string, endDate: string | null, isCurrent: boolean) => {
        const start = new Date(startDate)
        const end = isCurrent ? new Date() : new Date(endDate as string)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

        const years = Math.floor(months / 12)
        const remainingMonths = months % 12

        if (years === 0) return `${remainingMonths} mos`
        if (remainingMonths === 0) return `${years} ${years === 1 ? "yr" : "yrs"}`
        return `${years} ${years === 1 ? "yr" : "yrs"} ${remainingMonths} mos`
    }

    return (
        <div className="space-y-8">

            <div className="relative">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pb-8"
                    >
                        <MagicCard className="p-5 rounded-xl ">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                    <div className="flex items-center text-blue-400 mt-1">
                                        <Briefcase className="w-4 h-4 mr-1" />
                                        <span>{exp.company}</span>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-400 whitespace-nowrap">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>
                                        {formatDate(exp.startDate)} - {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>{getDuration(exp.startDate, exp.isCurrent ? null : exp.endDate, exp.isCurrent)}</span>
                                </div>
                            </div>

                            {exp.location && (
                                <div className="flex items-center text-sm text-gray-400 mb-3">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{exp.location}</span>
                                </div>
                            )}

                            {exp.description?.length > 0 && (
                                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-3">
                                    {exp.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            )}

                            {/* Tech stack + design tools as badges */}
                            {(exp.techStack || exp.designTools) && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {exp.techStack?.map((tech, i) => (
                                        <span
                                            key={`tech-${i}`}
                                            className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {exp.designTools?.map((tool, i) => (
                                        <span
                                            key={`design-${i}`}
                                            className="px-3 py-1 text-sm rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </MagicCard>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ExperienceContent

