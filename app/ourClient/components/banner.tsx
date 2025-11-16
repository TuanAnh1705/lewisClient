import Image from 'next/image';

export default function Banner() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image - Replace with your actual image */}
                <div className="absolute inset-0 z-0 bg-[#041122]">
                    <Image
                        src="/assets/client1.png" // Replace with your image path
                        alt="Financial background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#041122]/70" />
                </div>

                {/* Hero Content */}
                {/* THAY ĐỔI Ở ĐÂY: Thêm 'flex flex-col items-center' */}
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                    <h1 className="trajan-pro text-2xl md:text-5xl lg:text-5xl lg:max-w-5xl font-medium text-white ">
                        Trusted by <span className='text-[#BC9750]'>High-Achieving </span>Professionals and Entrepreneurs
                    </h1>
                    
                    {/* THAY ĐỔI Ở ĐÂY: Thêm 'mt-6' */}
                    <p className='arial-nova lg:max-w-2xl font-medium text-sm md:text-lg lg:text-xl text-white mt-5 md:mt-16'>
                        Our clients are at the top of their fields. They are C-level executives, innovative founders, and savvy investors who demand the highest level of expertise. Here are some of their stories.
                    </p>
                </div>
            </section>
        </div>
    );
}