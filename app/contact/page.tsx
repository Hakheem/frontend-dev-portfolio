import React from 'react';
import { client } from '@/lib/sanity.client';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import ContactForm from './_components/ContactForm';
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

async function getContactData(): Promise<ContactData | null> {
  const query = `*[_type == "contact"][0] {
    email,
    phone,
    location,
    socials[] {
      platform,
      url
    }
  }`;

  return await client.fetch(query);
}

const ContactPage = async () => {
  const contactData = await getContactData();

  if (!contactData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Contact information not found</div>
          <p className="text-gray-400">Please add your contact details to Sanity.</p>
        </div>
      </div>
    );
  }

  // Social icon mapping
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'whatsapp':
        return <FaWhatsapp size={20} />;
      case 'email':
      case 'gmail':
        return <Mail size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="min-h-screen mt-12 text-gray-300">
      <div className="mx-auto px-4 py-20">
        {/* Header Section */}
        <div className='max-w-3xl mb-12 mx-auto text-center flex flex-col justify-center items-center space-y-4 '>
          <h2 className="text-4xl text-gradient font-semibold ">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>



        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gradient mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Feel free to reach out through any of these channels. I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-primary/20 p-3 rounded-full flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-blue-500/20 p-3 rounded-full flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <Phone size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                  <a
                    href={`tel:${contactData.phone}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {contactData.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 group">
                <div className="bg-green-500/20 p-3 rounded-full flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <MapPin size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                  <p className="text-gray-400">{contactData.location}</p>
                </div>
              </div>

              {/* Social Links */}
              {contactData.socials && contactData.socials.length > 0 && (
                <div className="pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    {contactData.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 p-3 rounded-lg transition-all duration-300 group flex items-center justify-center"
                        aria-label={social.platform}
                      >
                        <div className="text-gray-400 group-hover:text-white transition-colors">
                          {getSocialIcon(social.platform)}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form  */}
            <div className="card  rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gradient mb-4">Let&apos;s Work Together</h2>
            <p className="text-gray-400 mb-6">
              I&apos;m currently available for freelance work and new opportunities. If you have a project that you want to get started or think you need my help with something, then get in touch.
            </p>
            <div className="flex flex-col lg:flex-row justify-center items-center mx-auto gap-4">
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Mail size={18} />
                Send an Email
              </a>
              {contactData.socials && contactData.socials.find(s => s.platform.toLowerCase() === 'linkedin') && (
                <a
                  href={contactData.socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors border border-gray-700 cursor-pointer"
                >
                  <Linkedin size={18} />
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;