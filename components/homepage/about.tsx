import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function About() {
    return (
        <div className="container mx-auto">
            <div className="relative z-10 -mt-10 max-w-5xl mx-auto bg-[#F2F0EC] p-10 md:p-16 rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Left: Avatar */}
                    <div className="flex shrink-0">
                        <Avatar className="h-48 w-48 md:h-64 md:w-64">
                            <AvatarImage
                                src="/assets/lewis.png" // <-- Thay ảnh của bạn
                                alt="Lewis"
                            />
                            <AvatarFallback>L</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Right: Content */}
                    <div className="text-gray-800">
                        <div className="relative inline-block text-3xl font-medium text-[#041122] leading-snug tracking-tight">
                            {/* Lớp 1 – Trajan Pro */}
                            <h2 className="trajan-pro">
                                LSJ TAX - Your Strategic Partner in International Tax
                            </h2>
                        </div>

                        <h3 className="gotham text-xl font-medium mt-2 text-[#BC9750]"> {/* Font Trajan Pro + Màu vàng */}
                            Lewis
                        </h3>
                        <p className="arial-nova mt-6 text-[#4D4946] leading-relaxed"> {/* Font Arial Nova */}
                            In a world of complex cross-border regulations and unqualified
                            advice, clarity is your greatest asset. I am Lewis, a UK-chartered
                            accountant and international tax strategist. My firm was founded on
                            a single principle: to provide sophisticated, legally-sound tax
                            strategies that protect and enhance your wealth. We don&apos;t just file
                            taxes; we create a bespoke financial framework that aligns with
                            your international ambitions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}