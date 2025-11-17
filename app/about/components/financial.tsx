import Image from 'next/image';
import Link from 'next/link';

export default function FinancialExpertise() {
  return (
    <div className="min-h-screen md:-mb-5">
      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-[#041122]">
          <Image
            src="/assets/ab1.png"
            alt="Financial background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-[#041122]/70" />
        </div>

        {/* Text */}
        <div className="relative z-10 text-center px-6">
          <h1 className="trajan-pro max-w-xs text-2xl md:max-w-5xl md:text-5xl font-medium text-white leading-tight">
            The Expertise and Philosophy Behind{' '}
            <span className="text-[#BC9750]">your Financial Success</span>
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 items-center">

          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0">
              <div className="relative w-full aspect-[3/3.7]">
                <Image
                  src="/assets/lewis.png"
                  alt="Founder"
                  fill
                  className="object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
            <p className="text-[#BC9750] gotham font-medium text-base sm:text-lg tracking-wider">
              About Us
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium trajan-pro leading-snug">
              Our Journey: Forged from a Need for Clarity & Integrity
            </h2>

            <div className="space-y-4 arial-nova text-[#041122] leading-relaxed text-sm sm:text-base">
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

            <div className="flex justify-center lg:justify-start">
              <Link href="/contact">
                <button className="gotham px-6 md:px-4 py-3 md:py-2.5 bg-[#BC9750] hover:bg-[#726857] text-white font-medium tracking-wide transition-colors duration-200 rounded-none hover:shadow-lg text-xs md:text-sm w-full sm:w-auto">
                  BOOK A STRATEGY CALL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
