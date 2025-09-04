'use client'

import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      service: '',
      subject: '',
      message: ''
    }
  });

  const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "E-commerce Solutions",
    "API Development",
    "Consultation",
    "Other"
  ];

  const onSubmit = async (data: FormData) => {
    // Trigger validation before submitting
    const isFormValid = await trigger();
    if (!isFormValid) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData object for web3forms
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("access_key", "2e87e991-b0d8-4c45-8efb-b653ffa7a54c");
      formDataToSubmit.append("from_name", "Portfolio Contact Form");
      
      // Add all form values first
      Object.entries(data).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      
      // Set email subject to include the user's subject
      formDataToSubmit.append("subject", `Portfolio Contact: ${data.subject}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        reset(); 
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
        console.error('Form submission error:', result);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate 
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white ${
              errors.name ? 'border-red-500' : 'border-gray-700/50'
            }`}
            placeholder="Enter your name"
            {...register("name", { 
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters"
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters and spaces"
              }
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Your Email *
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white ${
              errors.email ? 'border-red-500' : 'border-gray-700/50'
            }`}
            placeholder="Enter your email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address"
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* WhatsApp Field */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
          WhatsApp Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MessageCircle size={16} className="text-gray-500" />
          </div>
          <input
            id="whatsapp"
            type="text"
            className={`w-full pl-10 pr-4 py-3 bg-gray-800/30 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white ${
              errors.whatsapp ? 'border-red-500' : 'border-gray-700/50'
            }`}
            placeholder="+1 (___) ___ ____ (optional)"
            {...register("whatsapp", {
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Please enter a valid phone number"
              }
            })}
          />
        </div>
        {errors.whatsapp && (
          <p className="mt-1 text-sm text-red-400">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Service Field */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
          Service Needed
        </label>
        <select
          id="service"
          className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white appearance-none"
          {...register("service")}
        >
          <option value="">Select a service (optional)</option>
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
          Subject *
        </label>
        <input
          id="subject"
          type="text"
          className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white ${
            errors.subject ? 'border-red-500' : 'border-gray-700/50'
          }`}
          placeholder="What's this about?"
          {...register("subject", { 
            required: "Subject is required",
            minLength: {
              value: 5,
              message: "Subject must be at least 5 characters"
            },
            maxLength: {
              value: 100,
              message: "Subject must be less than 100 characters"
            }
          })}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Your Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-3 bg-gray-800/30 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all text-white resize-vertical ${
            errors.message ? 'border-red-500' : 'border-gray-700/50'
          }`}
          placeholder="Tell me about your project or inquiry..."
          {...register("message", { 
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters"
            },
            maxLength: {
              value: 1000,
              message: "Message must be less than 1000 characters"
            }
          })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitting 
            ? 'bg-primary/70 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary/90 cursor-pointer hover:shadow-lg'
        } text-white`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;