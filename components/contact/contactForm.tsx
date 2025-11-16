"use client";

import axiosClient from "@/utils/axiosClient";
import { PhoneCall } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';

export const ContactForm = () => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, netWorth, phone, message } = formData;

        // --- 1. VALIDATION LOGIC START ---

        // Rule: "nếu không điền gì mà submit thì toast báo submit failed"
        if (!name || !email || !netWorth || !phone || !message) {
            toast.error("Submit failed. Please fill in all fields.");
            return;
        }

        // Rule: "trường email bắt buộc phải có @"
        if (!email.includes('@')) {
            toast.error("Invalid email. Please include an '@' symbol.");
            return;
        }

        // Rule: "trường điện thoại bắt buộc là phải số"
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Invalid phone number. Please use numbers only.");
            return;
        }

        // Rule: "trường current phải nhập đúng chuẩn số tiền"
        const numericWorth = netWorth.replace(/[\$,]/g, ''); // Xóa $ và ,
        if (isNaN(parseFloat(numericWorth)) || !isFinite(parseFloat(numericWorth))) {
            toast.error("Invalid net worth. Please enter a valid number (e.g., 1000000).");
            return;
        }

        // --- VALIDATION LOGIC END ---

        // Nếu tất cả validation đều qua, tiếp tục submit
        setLoading(true);
        try {
            await axiosClient.post("/api/sheet/contact", formData);
            toast.success("Message sent successfully!");
            setFormData({
                name: "",
                email: "",
                netWorth: "",
                phone: "",
                message: "",
            });
        } catch (err) {
            console.error("Submit failed:", err);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                containerStyle={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                        fontSize: '18px',
                    },
                }}
            />

            <section className="relative w-full bg-[#F2F0EC] py-12 md:py-16 lg:py-24 flex justify-center overflow-hidden">
                {/* Ảnh nền - Chỉ hiện trên desktop */}
                <div className="hidden lg:block absolute left-0 top-0 w-[65%] h-full">
                    <Image
                        src="/assets/ct1.png"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="hidden lg:block absolute right-0 top-0 w-[35%] h-full">
                    <Image
                        src="/assets/ct2.png"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* CARD GỌI ĐIỆN - Desktop */}
                <div className="hidden lg:block absolute -translate-x-84 top-[35%] bg-[#4D4946] text-white p-8 max-w-sm shadow-xl z-10">
                    <PhoneCall className="text-[#BC9750] fill-[#BC9750] mb-8" fill="currentColor" />
                    <div>
                        <p className="arial-nova text-sm mb-1">
                            Call us for trusted financial insight
                        </p>
                        <p className="trajan-pro text-2xl font-serif">(00) 123 654 123</p>
                    </div>
                </div>

                {/* Container chính */}
                <div className="w-full max-w-7xl px-4 md:px-6 lg:px-0">
                    <div className="flex flex-col lg:flex-row lg:justify-end gap-6">
                        
                        {/* FORM */}
                        <div className="relative z-10 bg-white shadow-lg p-6 md:p-8 lg:p-10 w-full lg:w-[700px] lg:ml-[300px] lg:-translate-x-35">
                            <p className="gotham text-[#BC9750] uppercase tracking-wide font-medium mb-2 md:mb-3 text-xs md:text-sm">
                                Contact Us
                            </p>
                            <h2 className="trajan-pro text-[#041122] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-6 md:mb-8">
                                Get in Touch
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <input
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent text-sm md:text-base"
                                        required
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Your Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent text-sm md:text-base"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <input
                                        name="netWorth"
                                        placeholder="Your Current Income (USD)"
                                        value={formData.netWorth}
                                        onChange={handleChange}
                                        className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent text-sm md:text-base"
                                        required
                                    />
                                    <input
                                        name="phone"
                                        placeholder="Your Phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent text-sm md:text-base"
                                        required
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    placeholder="Write a Message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="arial-nova border-b text-[#726857] border-[#726857] w-full p-2 outline-none bg-transparent text-sm md:text-base resize-none"
                                    required 
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="gotham bg-[#BC9750] hover:bg-[#726857] text-white uppercase tracking-wider py-3 md:py-3.5 w-full transition disabled:opacity-70 text-sm md:text-base font-medium"
                                >
                                    {loading ? "Sending..." : "Send a Message"}
                                </button>
                            </form>
                        </div>

                        {/* CARD GỌI ĐIỆN - Mobile (hiển thị dưới form) */}
                        <div className="lg:hidden bg-[#4D4946] text-white p-6 md:p-8 shadow-xl">
                            <PhoneCall className="text-[#BC9750] fill-[#BC9750] mb-4 md:mb-6" size={28} fill="currentColor" />
                            <div>
                                <p className="arial-nova text-xs md:text-sm mb-1 md:mb-2">
                                    Call us for trusted financial insight
                                </p>
                                <p className="trajan-pro text-xl md:text-2xl font-serif">(00) 123 654 123</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};