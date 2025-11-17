import Image from 'next/image';

export default function Banner() {
    return (
        <div className="md:-mb-10">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image - Replace with your actual image */}
                <div className="absolute inset-0 z-0 bg-[#041122]">
                    <Image
                        src="/assets/sv15.png" // Replace with your image path
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
                    <h1 className="trajan-pro text-4xl md:text-5xl lg:text-5xl lg:max-w-md font-medium text-white ">
                       Cross-Border VAT Advisory
                    </h1>
                    
                    {/* THAY ĐỔI Ở ĐÂY: Thêm 'mt-6' */}
                    <p className='arial-nova lg:max-w-3xl font-medium text-xs max-w-xs md:text-lg lg:text-xl text-white mt-5 md:mt-12'>
                       Navigating the complexities of UK-EU VAT for seamless trade and compliance.
                    </p>
                </div>
            </section>
        </div>
    );
}