/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, FormEvent } from 'react';
import Image from "next/image";
import axiosClient from '@/utils/axiosClient';
import toast, { Toaster } from 'react-hot-toast';
import { Mail } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosClient.post('/api/sheet/email', { email });
      toast.success(response.data.message || "Successfully subscribed!");
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />

      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/blog1.png"
            alt="Newsletter Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="trajan-pro text-3xl md:text-5xl lg:text-5xl font-medium text-white mb-8 md:mb-12 leading-tight">
            GET EXPERT INSIGHTS
            <br />
            DELIVERED TO YOUR INBOX
          </h2>

          {/* Newsletter Form */}
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="arial-nova w-full sm:flex-1 px-6 py-4 text-base text-[#4D4946] placeholder-[#4D4946]/60 bg-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="gotham w-full sm:w-auto px-8 py-4 bg-[#BC9750] text-white uppercase tracking-wider font-medium hover:bg-[#726857] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsletterSection;