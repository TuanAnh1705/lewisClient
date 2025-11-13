import Image from 'next/image';

export default function ImgBottom() {
    return (
        <div className=" ">
            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden ">
                {/* Background Image - Replace with your actual image */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/assets/sv6.png" // Replace with your image path
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
                    <h1 className="trajan-pro text-4xl md:text-5xl lg:text-6xl lg:max-w-5xl font-medium text-white ">
                        Secure Your Financial Future
                    </h1>

                    <p className="arial-nova font-light text-white md:text-xl md:max-w-2xl">
                        Take the first step towards a more secure and tax-efficient international life. Contact us for a confidential consultation.
                    </p>

                    {/* THAY ĐỔI Ở ĐÂY: Thêm 'mt-6' */}
                    <button className="gotham px-4 md:mt-10 py-2.5 bg-[#BC9750] hover:bg-[#726857] text-white font-medium tracking-wide transition-colors duration-200 rounded-none shadow-md hover:shadow-lg md:text-xs">
                        SCHEDULE A CONFIDENTIAL CONSULTATION
                    </button>
                </div>
            </section>
        </div>
    );
}