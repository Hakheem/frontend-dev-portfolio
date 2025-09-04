import React from 'react'
import { MagicCard } from "@/components/magicui/magic-card";
import { TechMarquee } from './TechMarquee';
import { Palette, ShoppingCart, Code, Send, ArrowRight, Layout, Zap, Users } from 'lucide-react';

const ServicesGrid = () => {
  return (
    <div className="padded min-h-screen flex flex-col gap-6 py-12">
      {/* Heading Section */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <h2 className=" text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-3">
          Crafting <span className="text-gradient">Pixel-Perfect</span> Experiences
        </h2>
        <p className=" text-gray-400 max-w-xl ">
          Combining elegant design with cutting-edge technology to create exceptional digital solutions
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* UI/UX Design */}
        <div className="h-full">
          <MagicCard className="h-full p-6 flex flex-col">
            {/* Top content */}
            <div className="flex flex-col space-y-6 flex-grow">
              {/* Header */}
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Palette className="text-primary w-6 h-6" />
                </div>
                <span className="text-lg font-semibold text-gray-100">UI/UX Design</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                From wireframes to high-fidelity prototypes, I create seamless and engaging interfaces that align with your brand's identity and user needs.
              </p>

              {/* Features list */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-300 text-sm">User Research & Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-300 text-sm">Wireframing & Prototyping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-300 text-sm">Interaction Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-300 text-sm">Visual Design & Branding</span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>
            </div>

            {/* Bottom section with chat UI */}
            <div className="mt-6 bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-xl p-4 border border-gray-800">
              {/* Chat bubbles */}
              <div className="flex flex-col space-y-3 mb-4">
                <div className="self-start bg-gray-800 rounded-2xl rounded-bl-none px-3 py-2 max-w-xs">
                  <p className="text-gray-300 text-sm">Need a design that converts?</p>
                </div>
                <div className="self-end bg-primary/20 rounded-2xl rounded-br-none px-3 py-2 max-w-xs">
                  <p className="text-primary text-sm">Let's discuss your project!</p>
                </div>
              </div>

              {/* Input with send button */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Your message..."
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  disabled
                />
                <div className="absolute right-2 flex items-center justify-center w-8 h-8 rounded-lg text-primary cursor-not-allowed">
                  <Send size={16} />
                </div>
              </div>
            </div>
          </MagicCard>
        </div>

        {/* Right Column  */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* E-commerce Card */}
          <MagicCard className="p-6 overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex gap-3 items-center mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ShoppingCart className="text-primary w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Ecommerce Store</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed ">
                Whether you're launching a new shop or optimizing an existing one, I ensure a smooth shopping experience that drives sales.
              </p>

              {/* Visual section with product cards */}
              <div className="relative h-40 mt-auto overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#252525] p-3">
                {/* Product card 1 */}
                <div className="absolute top-3 left-3 w-16 h-20 bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] rounded-lg shadow-lg p-1.5">
                  <div className="w-full h-10 bg-gray-600 rounded mb-1"></div>
                  <div className="h-2 bg-gray-700 rounded mb-1"></div>
                  <div className="h-1.5 bg-gray-700 rounded w-2/3"></div>
                </div>

                {/* Product card 2 */}
                <div className="absolute top-4 left-10 w-16 h-20 bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] rounded-lg shadow-lg p-1.5 z-10">
                  <div className="w-full h-10 bg-primary/20 rounded mb-1"></div>
                  <div className="h-2 bg-gray-700 rounded mb-1"></div>
                  <div className="h-1.5 bg-gray-700 rounded w-2/3"></div>
                </div>

                {/* Product card 3 */}
                <div className="absolute bottom-3 right-3 w-16 h-20 bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] rounded-lg shadow-lg p-1.5">
                  <div className="w-full h-10 bg-gray-600 rounded mb-1"></div>
                  <div className="h-2 bg-gray-700 rounded mb-1"></div>
                  <div className="h-1.5 bg-gray-700 rounded w-2/3"></div>
                </div>

                {/* Shopping cart icon */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="text-primary w-3 h-3" />
                </div>
              </div>
            </div>
          </MagicCard>

          {/* Website Customization Card */}
          <MagicCard className="p-6 overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex gap-3 items-center mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Layout className="text-primary w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100">Website Customization</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                Websites to match your specific needs, from layout adjustments to functionality enhancements.
              </p>

              {/* Visual section - browser window with layout elements */}
              <div className="relative h-40 mt-auto overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#252525] p-2">
                {/* Browser header */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>

                {/* Layout elements */}
                <div className="grid grid-cols-12 gap-1">
                  <div className="col-span-3 h-3 bg-gray-700 rounded"></div>
                  <div className="col-span-9 h-3 bg-gray-700 rounded"></div>
                  <div className="col-span-12 h-2 bg-gray-600 rounded mt-1"></div>
                  <div className="col-span-4 h-12 bg-primary/20 rounded mt-1"></div>
                  <div className="col-span-8 h-12 bg-gray-700 rounded mt-1"></div>
                  <div className="col-span-6 h-2 bg-gray-600 rounded mt-1"></div>
                  <div className="col-span-6 h-2 bg-gray-600 rounded mt-1"></div>
                </div>
              </div>
            </div>
          </MagicCard>

          {/* Performance Optimization Card */}
          <MagicCard className="p-5">
            <div className="flex flex-col h-full">
              <div className="flex gap-3 items-center mb-3">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Zap className="text-primary w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-100">Performance Optimization</h3>
              </div>
              <p className="text-gray-300 flex-grow">
                Speed-optimized websites that load faster, rank higher, and convert better.
              </p>
              <div className="mt-3 flex justify-end">
                <ArrowRight className="text-primary w-4 h-4" />
              </div>
            </div>
          </MagicCard>

          {/* User Experience Card */}
          <MagicCard className="p-5">
            <div className="flex flex-col h-full">
              <div className="flex gap-3 items-center mb-3">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Users className="text-primary w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-100">User Experience</h3>
              </div>
              <p className="text-gray-300 flex-grow">
                Intuitive interfaces with seamless interactions that keep users engaged.
              </p>
              <div className="mt-3 flex justify-end">
                <ArrowRight className="text-primary w-4 h-4" />
              </div>
            </div>
          </MagicCard>
        </div>
      </div>

      {/* Tech Stack Section  */}
      <div className="">
        <MagicCard className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center h-full">
            <div className="w-full md:w-1/2 pr-5 pl-2">
              <h3 className="text-gray-100 text-lg md:text-2xl font-semibold mb-4">
                Powered by Modern Technology
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I leverage cutting-edge tools and frameworks to build interfaces that are not only beautiful but also performant, accessible, and maintainable.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative">
              <TechMarquee />
            </div>
          </div>
        </MagicCard>
      </div>
    </div>
  )
}

export default ServicesGrid

