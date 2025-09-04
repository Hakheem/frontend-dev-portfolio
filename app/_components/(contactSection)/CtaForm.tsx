"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/ui/button";

const services = [
    "Web App Development",
    "Website Design",
    "E-commerce Platforms",
    "Payment Integration",
    "UI/UX design",
    "Ongoing Maintenance",
    "Custom Software",
    "Graphic Design",
    "Something Else",
];

const CtaForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPhone, setShowPhone] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return value.trim().length < 5
                    ? "Full name must be at least 5 characters."
                    : "";
            case "email":
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? "Please enter a valid email address."
                    : "";
            case "serviceType":
                return !value ? "Please select a service." : "";
            default:
                return "";
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            serviceType: validateField("serviceType", formData.serviceType),
        };

        setErrors(newErrors);
        return Object.values(newErrors).every((msg) => msg === "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("access_key", "2e87e991-b0d8-4c45-8efb-b653ffa7a54c");
            formDataToSubmit.append("name", formData.name);
            formDataToSubmit.append("email", formData.email);
            formDataToSubmit.append("phone", formData.phone);
            formDataToSubmit.append("serviceType", formData.serviceType);
            formDataToSubmit.append("message", formData.message);

            const object = Object.fromEntries(formDataToSubmit.entries());
            const json = JSON.stringify(object);

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            const result = await res.json();

            if (result.success) {
                toast.success("Your request has been sent.I will be in touch.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    serviceType: "",
                    message: "",
                });
                setErrors({});
                setShowPhone(false);
                setShowMessage(false);
            } else {
                throw new Error("Failed to send email.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                    placeholder="Enter your name"
                />
                {errors.name && (
                    <p className="text-sm text-red-400 mt-1.5">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                    placeholder="you@company.com"
                />
                {errors.email && (
                    <p className="text-sm text-red-400 mt-1.5">{errors.email}</p>
                )}
            </div>

            {/* Toggle Phone */}
            {!showPhone && (
                <button
                    type="button"
                    onClick={() => setShowPhone(true)}
                    className="text-blue-400/90 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                    <span>+</span> Add phone number
                </button>
            )}

            {/* Phone */}
            {showPhone && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone (Optional)
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                        placeholder="+1 (___) ___ ____"
                    />
                </div>
            )}

            {/* Service */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interested In *
                </label>
                <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all appearance-none"
                >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                        <option key={service} value={service}>
                            {service}
                        </option>
                    ))}
                </select>
                {errors.serviceType && (
                    <p className="text-sm text-red-400 mt-1.5">{errors.serviceType}</p>
                )}
            </div>

            {/* Toggle Message */}
            {!showMessage && (
                <button
                    type="button"
                    onClick={() => setShowMessage(true)}
                    className="text-blue-400/90 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                    <span>+</span> Add extra project details
                </button>
            )}

            {/* Message */}
            {showMessage && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details (Optional)
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell me about your project goals, timeline, and any specific requirements..."
                        className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                    />
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Sending...
                    </span>
                ) : (
                    "Send Request"
                )}
            </Button>
        </form>
    );
};

export default CtaForm;
