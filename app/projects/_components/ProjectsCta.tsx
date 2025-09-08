"use client";

import Button from "@/components/ui/button";
import { FaRocket } from "react-icons/fa";
import { Mail, PhoneIncoming } from "lucide-react";

const ProjectsCta = () => {

  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in discussing a project with you.";
    const whatsappUrl = `https://wa.me/254769403162?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  
  return (
    <div className="w-full relative my-16 padded flex items-center justify-center">
      {/* Main container with gradient background and subtle animation */}
      <div className="relative overflow-hidden card shadow-2xl w-full max-w-6xl p-8 md:p-12">
        
        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 items-center gap-8 w-full">
          
          {/* Text section - 3 columns */}
          <div className="lg:col-span-3 text-white space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <FaRocket className="text-primary" />
              <span className="text-lg">Simple, Easy, Quick Steps</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold text-gradient leading-tight">
              Ready to bring your vision to life?
            </h2>
            
            <p className="text-gray-200 leading-relaxed max-w-lg">
              Let's collaborate on your next project. Get in touch today and let's create something amazing together.
            </p>
            
            {/* Decorative elements */}
            <div className="flex gap-2 pt-2">
              <div className="w-12 h-1 rounded-full bg-primary"></div>
              <div className="w-6 h-1 rounded-full bg-primary"></div>
              <div className="w-3 h-1 rounded-full bg-primary"></div>
            </div>
          </div>
          
          {/* Contact section - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email card */}
            <div className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg ">
            <div className=" bg-blue-500/20 text-blue-300 border border-blue-500/30 p-3 rounded-lg transition-transform duration-300">
                <Mail size={20} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium">Email Me Anytime</p>
                <a
                  href="mailto:hakheem67@gmail.com"
                    className="text-gray-300 font-semibold hover:text-primary "
                >
                  hakheem67@gmail.com 
                </a>
              </div>
            </div>
            
            {/* Phone card */}
            <div className="group flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg ">
              <div className=" bg-blue-500/20 text-blue-300 border border-blue-500/30 p-3 rounded-lg transition-transform duration-300">
                <PhoneIncoming size={20} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium">For Urgent Assistance</p>
                <a
                  href="tel:+254769403162"
                  className="text-gray-300 font-semibold hover:text-primary "
                >
                  +254 769 403 162
                </a>
              </div>
            </div>
            
            {/* CTA button */}
            <Button className="w-full mt-4 py-5 "
            onClick={handleWhatsAppClick}
            >
              Start a Project
              <FaRocket />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCta;
