import Image from 'next/image';
import Link from 'next/link';

export default function FinancialExpertise() {
  return (
    <div className="min-h-screen md:-mb-5">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image - Replace with your actual image */}
        <div className="absolute inset-0 z-0 bg-[#041122]">
          <Image
            src="/assets/ab1.png" // Replace with your image path
            alt="Financial background"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#041122]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="trajan-pro text-4xl md:text-5xl lg:text-5xl lg:max-w-6xl font-medium text-white ">
            The Expertise and Philosophy Behind
            your Financial Success
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[3/3.5] w-full max-w-md mx-auto lg:mx-0">
              <Image
                src="/assets/lewis.png" // Replace with your image path
                alt="Founder"
                fill
                className="object-cover rounded-none shadow-lg"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 space-y-5">
            <p className="text-[#BC9750] gotham font-medium text-lg tracking-wider">
              About Us
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-4xl font-medium trajan-pro leading-tight">
              Our Journey: Forged from a Need for Clarity & Integrity
            </h2>

            <div className="space-y-4 arial-nova text-[#041122] leading-relaxed text-md">
              <p>
                After years in corporate finance, I saw a recurring problem:{' '}
                <span className="font-semibold text-gray-900">
                  ambitious entrepreneurs and successful professionals were being let down by generic, one-size-fits-all tax advice.
                </span>{' '}
                They faced significant financial risks due to complex international laws and a lack of access to high-level, strategic counsel.
              </p>

              <p>
                I founded this firm to close that gap. My journey has been driven by a passion for solving complex puzzles and a commitment to providing the calibre of advice that high-achievers deserve.
              </p>
            </div>
            <Link href="/contact">
              <button className="gotham mt-1.5 px-6 py-3 bg-[#BC9750] hover:bg-[#726857] text-white font-medium tracking-wide transition-colors duration-200 rounded-none  hover:shadow-lg md:text-sm">
                BOOK A STRATEGY CALL
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}