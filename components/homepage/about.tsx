import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function About() {
  return (
    <div className="container mx-auto px-4">
      <div className="relative z-10 -mt-10 max-w-4xl md:max-w-5xl mx-auto bg-[#F2F0EC] p-6 sm:p-10 md:p-16 rounded-lg shadow-xl overflow-hidden">
        
        {/* Thay đổi: md:items-start -> md:items-center */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 sm:gap-10 md:gap-12">

          {/* Avatar */}
          <div className="flex shrink-0 justify-center md:justify-start">
            <Avatar className="h-36 w-36 sm:h-44 sm:w-44 md:h-63 md:w-63">
              <AvatarImage
                src="/assets/lewis.png"
                alt="Lewis"
                className="object-cover"
              />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
          </div>

          {/* Content */}
          <div className="text-gray-800 text-center md:text-left px-2">
            <h2 className="trajan-pro text-lg sm:text-3xl md:text-4xl font-medium text-[#041122] leading-snug tracking-tight">
              LSJ TAX - Your Strategic Partner in International Tax
            </h2>

            <h3 className="gotham text-lg sm:text-xl font-medium text-[#BC9750]">
              Lewis
            </h3>

            <p className="arial-nova mt-4 sm:mt-6 text-[13px] md:text-[17px] text-[#4D4946] leading-normal md:max-w-[570px]">
              In a world of complex cross-border regulations and unqualified advice,
              clarity is your greatest asset. I am Lewis, a UK-chartered accountant and
              international tax strategist. My firm was founded on a single principle:
              to provide sophisticated, legally-sound tax strategies that protect and
              enhance your wealth. We don&apos;t just file taxes; we create a bespoke
              financial framework that aligns with your international ambitions.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}