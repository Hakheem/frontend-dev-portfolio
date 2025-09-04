"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import {
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFramer,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiMongodb,
  SiAdobexd,
  SiNextdotjs,
  SiWordpress,
  SiPostgresql,
} from "react-icons/si";

import { Box } from "lucide-react";

const designStack = [
  { name: "Figma", icon: SiFigma },
  { name: "Photoshop", icon: SiAdobephotoshop },
  { name: "Illustrator", icon: SiAdobeillustrator },
  { name: "Adobe ", icon: SiAdobexd },
  { name: "Framer", icon: SiFramer },
  { name: "Spline", icon: Box },
];

const devStack = [
  { name: "Nextjs", icon: SiNextdotjs },
  { name: "Python", icon: SiPython },
  { name: "React", icon: SiReact },
  { name: "JavaScript", icon: SiJavascript },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "Wordpress", icon: SiWordpress },
  { name: "Postgresql", icon: SiPostgresql },
];

const TechCard = ({
  name,
  Icon,
}: {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div
      className={cn(
        "flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow-sm",
        "border-gray-200/10 bg-[#121212] hover:bg-[#1a1a1a] transition-colors"
      )}
    >
      <Icon className="text-3xl text-gray-200" />
      <p className="text-sm text-gray-200">{name}</p>
    </div>
  );
};

export function TechMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 py-6">
      {/* Design Stack */}
      <div className="relative lg:w-[70%] w-full mx-auto group">
        <Marquee reverse pauseOnHover className="[--duration:70s]">
          {designStack.map(({ name, icon: Icon }) => (
            <TechCard key={name} name={name} Icon={Icon} />
          ))}
        </Marquee>
      </div>

      {/* Dev Stack */}
      <div className="relative w-full lg:w-[95%] group">
        <Marquee pauseOnHover className="[--duration:80s]">
          {devStack.map(({ name, icon: Icon }) => (
            <TechCard key={name} name={name} Icon={Icon} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
