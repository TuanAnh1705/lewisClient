import Image from 'next/image';
import Link from 'next/link';

export default function ImgBottom() {
    return (
        <div className=" ">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden ">
                {/* Background Image - Replace with your actual image */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/assets/sv4.png" // Replace with your image path
                        alt="Financial background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    {/* Overlay */}

                </div>

                {/* Hero Content */}
                {/* THAY ĐỔI Ở ĐÂY: Thêm 'flex flex-col items-center' */}
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                    <h1 className="trajan-pro text-2xl md:text-5xl lg:text-6xl lg:max-w-5xl font-medium text-white ">
                        Ready to Build Your Bespoke Tax Strategy?
                    </h1>

                    {/* THAY ĐỔI Ở ĐÂY: Thêm 'mt-6' */}
                    <Link href="/contact">
                        <button className="gotham px-4 mt-5 md:mt-10 py-2.5 bg-[#BC9750] hover:bg-[#726857] text-white font-medium tracking-wide transition-colors duration-200 rounded-none shadow-md hover:shadow-lg text-xs md:text-xs">
                            LET’S GET STARTED
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}