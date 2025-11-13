"use client";

import axiosClient from "@/utils/axiosClient";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const GetFreeConsultingSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        netWorth: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            netWorth: "",
            phone: "",
            message: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, netWorth, phone, message } = formData;

        // Validation logic
        if (!name || !email || !netWorth || !phone || !message) {
            toast.error("Submit failed. Please fill in all fields.");
            return;
        }

        if (!email.includes('@')) {
            toast.error("Invalid email. Please include an '@' symbol.");
            return;
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Invalid phone number. Please use numbers only.");
            return;
        }

        const numericWorth = netWorth.replace(/[\$,]/g, '');
        if (isNaN(parseFloat(numericWorth)) || !isFinite(parseFloat(numericWorth))) {
            toast.error("Invalid net worth. Please enter a valid number (e.g., 1000000).");
            return;
        }

        setLoading(true);
        try {
            await axiosClient.post("/api/sheet/contact", formData);
            toast.success("Message sent successfully!");
            handleReset();
        } catch (err) {
            console.error("Submit failed:", err);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                    },
                }}
            />

            <section className="w-full py-20 bg-whiteS">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left Section - Form */}
                        <div className="bg-[#F2F0EC] p-12 lg:p-16">
                            <p className="gotham text-[#BC9750] uppercase tracking-wide text-sm font-medium mb-3">
                                CONNECT WITH US
                            </p>
                            <h2 className="trajan-pro text-[#041122] text-2xl md:text-4xl font-medium mb-12">
                                GET FREE CONSULTING
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="arial-nova border-b border-[#4D4946] pb-3 outline-none bg-transparent text-[#4D4946] placeholder:text-[#4D4946]/50"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Your Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="arial-nova border-b border-[#4D4946] pb-3 outline-none bg-transparent text-[#4D4946] placeholder:text-[#4D4946]/50"
                                    />
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        name="netWorth"
                                        placeholder="Your Current Net Worth"
                                        value={formData.netWorth}
                                        onChange={handleChange}
                                        className="arial-nova border-b border-[#4D4946] pb-3 outline-none bg-transparent text-[#4D4946] placeholder:text-[#4D4946]/50"
                                    />
                                    <input
                                        name="phone"
                                        placeholder="Your Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="arial-nova border-b border-[#4D4946] pb-3 outline-none bg-transparent text-[#4D4946] placeholder:text-[#4D4946]/50"
                                    />
                                </div>

                                {/* Message */}
                                <textarea
                                    name="message"
                                    placeholder="Write a Message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="arial-nova border-b border-[#4D4946] w-full pb-3 outline-none bg-transparent text-[#4D4946] placeholder:text-[#4D4946]/50 resize-none"
                                />

                                {/* Buttons */}
                                <div className="grid gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="gotham bg-[#BC9750] hover:bg-[#a8853f] text-white uppercase tracking-wider py-4 transition disabled:opacity-70 font-medium"
                                    >
                                        {loading ? "Sending..." : "Send a Message"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Section - Contact Info */}
                        <div className="bg-white p-12 lg:p-16 flex flex-col justify-center">
                            <p className="gotham text-[#BC9750] uppercase tracking-wide text-sm font-medium mb-3">
                                NEED ANY HELP?
                            </p>
                            <h2 className="trajan-pro text-[#041122] text-2xl md:text-4xl font-medium mb-3">
                                TALK TO US
                            </h2>

                            <p className="arial-nova text-[#4D4946] leading-relaxed mb-12 max-w-md">
                                We&apos;d love to hear from you. Whether you have a project in mind, a question about our services, or just want to start the conversation — reach out through the details below, and our team will get back to you shortly.
                            </p>

                            {/* Contact Items */}
                            <div className="space-y-4">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#041122] flex items-center justify-center shrink-0">
                                        <PhoneCall className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="arial-nova text-sm text-[#4D4946] mb-1">
                                            Have any questions?
                                        </p>
                                        <a
                                            href="tel:+123456789"
                                            className="text-[#BC9750] font-medium arial-nova text-lg"
                                        >
                                            +123 456 789
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#041122] flex items-center justify-center shrink-0">
                                        <Mail className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="arial-nova text-sm text-[#4D4946] mb-1">
                                            Send us your email
                                        </p>
                                        <a
                                            href="mailto:lsjtax@infor.com"
                                            className="text-[#BC9750] font-medium arial-nova text-lg"
                                        >
                                            lsjtax@infor.com
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#041122] flex items-center justify-center shrink-0">
                                        <MapPin className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="arial-nova text-sm text-[#4D4946] mb-1">
                                            Visit anytime
                                        </p>
                                        <a
                                            href="#"
                                            className="text-[#BC9750] font-medium arial-nova text-lg"
                                        >
                                            771 Ngo Quyen, Son Tra Ward, Vietnam
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};