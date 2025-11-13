import Image from 'next/image';

export default function Banner() {
    return (
        <div className="md:-mb-10">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image - Replace with your actual image */}
                <div className="absolute inset-0 z-0 bg-[#041122]">
                    <Image
                        src="/assets/sv.png" // Replace with your image path
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
                    <h1 className="trajan-pro text-4xl md:text-5xl lg:text-5xl lg:max-w-4xl font-medium text-white ">
                        <span className='text-[#BC9750]'>Bespoke Tax Strategies</span> for International Success
                    </h1>
                    
                    {/* THAY ĐỔI Ở ĐÂY: Thêm 'mt-6' */}
                    <p className='arial-nova lg:max-w-3xl font-medium text-md md:text-lg lg:text-xl text-white mt-16'>
                        A holistic approach to your financial picture. We offer three core strategic services designed to address the most critical cross-border financial challenges for our clients.
                    </p>
                </div>
            </section>
        </div>
    );
}