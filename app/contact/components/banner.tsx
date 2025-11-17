import Image from 'next/image';

export default function Banner() {
    return (
        /* XÓA BỎ DIV bọc ngoài có class "min-h-screen md:-mb-80".
           Hãy để SECTION làm component gốc.
        */
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
            
            {/* Background Image - Replace with your actual image */}
            <div className="absolute inset-0 z-0 bg-[#041122]">
                <Image
                    src="/assets/contact.png" // Replace with your image path
                    alt="Financial background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#041122]/70" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h1 className="trajan-pro text-4xl md:text-5xl lg:text-5xl lg:max-w-3xl font-medium text-white ">
                    Let&apos;s Build Your <span className='text-[#BC9750]'>International Tax Strategy</span>
                </h1>
                
                <p className='arial-nova lg:max-w-2xl font-medium text-xs max-w-sm md:text-lg lg:text-xl text-white mt-5 md:mt-16'>
                    To begin the conversation, please complete the form below. This allows us to understand your needs before our initial call. Our team will review your submission and contact you within one business day to schedule your confidential consultation.
                </p>
            </div>
        </section>
        /* XÓA BỎ </div> đóng ở đây */
    );
}