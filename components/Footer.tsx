'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Code,
  ArrowUp,
  Home,
  Folder,
  User
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";


interface ContactData {
  email: string;
  phone: string;
  location: string;
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

interface FooterProps {
  contactData: ContactData | null;
}

const Footer: React.FC<FooterProps> = ({ contactData }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Social icons
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'twitter':
        return <Twitter size={18} />;
      case 'whatsapp':
        return <FaWhatsapp size={18} />;
      case 'email':
      case 'gmail':
        return <Mail size={18} />;
      default:
        return <ExternalLink size={18} />;
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail }
  ];

  const techStack = [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Mongo Db',
    'Sanity CMS',
    'Python',
    'Tailwind ',
    'Node.js',
    'PostgreSql',
  ];

  if (!contactData) {
    return (
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-t border-gray-800/50">
        <div className="padded py-8 text-center">
          <p className="text-gray-400">Contact information not available</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-t border-gray-800/50">
      {/* Back to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-gradient-to-br from-gray-900 to-black text-white p-3 rounded-full border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      <div className="padded py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <Code size={28} className="text-primary" />
                <span className="text-xl font-semibold text-gradient">Hector John.</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs leading-relaxed">
              Crafting digital experiences with modern technologies and clean code.
            </p>
            {contactData.socials && contactData.socials.length > 0 && (
              <div className="flex space-x-4">
                {contactData.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors duration-300 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className=' lg:ml-5' >
            <h3 className="text-lg font-semibold text-gradient mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <Icon size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-gradient mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gradient mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${contactData.email}`}
                className="block text-gray-400 text-sm hover:text-primary transition-colors duration-300"
              >
                {contactData.email}
              </a>
              {contactData.phone && (
                <a
                  href={`tel:${contactData.phone}`}
                  className="block text-gray-400 text-sm hover:text-primary transition-colors duration-300"
                >
                  {contactData.phone}
                </a>
              )}
              <p className="text-gray-400 text-sm">{contactData.location}</p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors duration-300 border border-primary/20"
                >
                  <Mail size={16} />
                  Say Hello
                </Link>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </footer>
  );
};

export default Footer;
