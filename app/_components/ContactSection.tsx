import { Mail, Phone } from "lucide-react";
import CtaForm from "./(contactSection)/CtaForm";

const ContactSection = () => {
    return (
        <div className="padded my-12" id='contact' >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 card lg:p-16 p-6 md:p-6 rounded-lg border border-gray-800 shadow-lg">
                {/* Left Section - Contact Details */}
                <div className="flex flex-col justify-center">
                    <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">
                        Get in Touch
                    </p>
                    <h2 className="font-heading text-3xl font-bold mt-2 mb-6 text-gray-100 leading-snug">
                        Let's Build Something Great Together
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Ready to bring your ideas to life? I specialize in crafting modern web
                        applications and stunning user experiences that make an impact. From concept
                        to deployment, I'll work with you to build something exceptional. Let's
                        connect and discuss your next project.
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-center gap-6">
                            <div className="p-5 rounded-full border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex-shrink-0">
                                <Mail size={24} className="text-gray-200" />
                            </div>
                            <div>
                                <p className="text-gray-300 font-semibold">Email Me Anytime:</p>
                                <a
                                    href="mailto:hakheem67@gmail.com"
                                    className="text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 bg-transparent border-none shadow-none p-0 h-auto"
                                >
                                    Email
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-6">
                            <div className="p-5 rounded-full border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex-shrink-0">
                                <Phone size={24} className="text-gray-200" />
                            </div>
                            <div>
                                <p className="text-gray-300 font-semibold">
                                    For Urgent Assistance:
                                </p>
                                <a
                                    href="tel:+254769403162"
                                    className="text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 bg-transparent border-none shadow-none p-0 h-auto"
                                >
                                    Call me
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    {/* Form */}
                    <CtaForm />
                </div>
            </div>
        </div>
    );
};

export default ContactSection;