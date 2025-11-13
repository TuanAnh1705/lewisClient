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
                toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                    },
                }}
            />

            <section className="relative w-full bg-[#F2F0EC] py-24 flex justify-center overflow-hidden">
                {/* Ảnh nền */}
                <div className="absolute left-0 top-0 w-[65%] h-full">
                    <Image
                        src="/assets/ct1.png"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute right-0 top-0 w-[35%] h-full">
                    <Image
                        src="/assets/ct2.png"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* CARD GỌI ĐIỆN */}
                <div className="absolute left-[17%] top-[35%] bg-[#4D4946] text-white p-8 max-w-sm shadow-xl z-10">
                    <PhoneCall className="text-[#BC9750] fill-[#BC9750] mb-8" fill="currentColor" />
                    <div>
                        <p className="arial-nova text-sm mb-1">
                            Call us for trusted financial insight
                        </p>
                        <p className="trajan-pro text-2xl font-serif">(00) 123 654 123</p>
                    </div>
                </div>

                {/* FORM */}
                <div className="relative z-10 bg-white shadow-lg p-10 max-w-3xl w-[90%] lg:w-[700px] lg:ml-[300px]">
                    <p className="gotham text-[#BC9750] uppercase tracking-wide font-medium mb-3">
                        Contact Us
                    </p>
                    <h2 className="trajan-pro text-[#041122] text-6xl font-medium mb-8">
                        Get in Touch
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent"
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="netWorth"
                                placeholder="Your Current Net Worth"
                                value={formData.netWorth}
                                onChange={handleChange}
                                className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent"
                                required
                            />
                            <input
                                name="phone"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="arial-nova border-b text-[#726857] border-[#726857] p-2 outline-none bg-transparent"
                                required
                            />
                        </div>

                        <textarea
                            name="message"
                            placeholder="Write a Message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className=" arial-nova border-b text-[#726857] border-[#726857] w-full p-2 outline-none"
                            required 
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading}
                            className="gotham bg-[#BC9750] hover:bg-[#a8853f] text-white uppercase tracking-wider py-3 w-full transition disabled:opacity-70"
                        >
                            {loading ? "Sending..." : "Send a Message"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};