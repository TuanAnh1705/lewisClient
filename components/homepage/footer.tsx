/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Bắt buộc để sử dụng state và event handlers

import React, { useState, FormEvent } from 'react';
import Image from "next/image";
import axiosClient from '@/utils/axiosClient';
import toast, { Toaster } from 'react-hot-toast'; // <-- CHANGED: Import toast

export const FooterSection = () => {
  // Thêm state để quản lý form
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // REMOVED: message and isError states are no longer needed
  // const [message, setMessage] = useState("");
  // const [isError, setIsError] = useState(false);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn form submit theo cách truyền thống
    
    if (!email) {
      // CHANGED: Use toast for error
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    // REMOVED: No need to reset messages

    try {
      // Gọi API route của bạn
      const response = await axiosClient.post('/api/sheet/email', { email });
      
      // CHANGED: Use toast for success
      toast.success(response.data.message || "Successfully subscribed!");
      setEmail(""); // Xóa email trong input sau khi thành công
    } catch (error: any) {
      // CHANGED: Use toast for error
      const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <> {/* <-- ADDED: Fragment to wrap Toaster and footer */}
      
      {/* ADDED: Toaster component to render notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          // Optional: Add some styling for dark mode
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />

      <footer className="bg-[#041122] text-white py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Logo and Newsletter */}
            <div>
              {/* Logo Section */}
              <div className="mb-8 pl-2">
                <Image
                  src="/assets/logoLight.png"
                  alt="LSJ TAX"
                  width={300}
                  height={40}
                  priority
                />
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="trajan-pro text-xl font-light mb-4 uppercase tracking-wider">
                  SIGN UP FOR NEWSLETTER
                </h3>
                
                {/* Cập nhật <form> */}
                <form 
                  className="inline-flex items-center border-b border-[#BC9750] pb-1"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="arial-nova bg-transparent outline-none text-sm text-white placeholder-gray-500 pr-4 min-w-[250px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading} // Vô hiệu hóa khi đang gửi
                  />
                  <button
                    type="submit"
                    className="transition-colors"
                    disabled={isLoading} // Vô hiệu hóa khi đang gửi
                  >
                    <span className="arial-nova text-sm text-white hover:text-[#d4ac5a]">
                      {/* CHANGED: Updated loading text */}
                      {isLoading ? "Submitting..." : "Subscribe"}
                    </span>
                    <span className="ml-2 text-[#BC9750]">→</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: All Links and Copyright */}
            <div>
              {/* Links Grid */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-6 mb-8">
                {/* Company Links */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    COMPANY
                  </h4>
                  <ul className="arial-nova space-y-1">
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Our Team
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Services Links */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    SERVICES
                  </h4>
                  <ul className="arial-nova space-y-1">
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Personal Income Tax Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Corporate Tax Structuring
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Cross-Border VAT Optimisation
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Follow Us Links */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    FOLLOW US
                  </h4>
                  <ul className="arial-nova space-y-1">
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Linkedin
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-sm text-gray-300 hover:text-[#BC9750] transition-colors">
                        X
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Section - Privacy and Copyright */}
              <div className="arial-nova flex justify-between items-center pt-9">
                <div className="text-xs text-white">
                  <a href="#" className="hover:text-[#BC9750] transition-colors">
                    Privacy Policy
                  </a>
                </div>
                <div className="text-xs text-white">
                  2025 © LJS | TAX. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </> // <-- ADDED: Closing fragment
  );
};

export default FooterSection;