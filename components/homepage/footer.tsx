"use client";

import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link"; // <-- Dùng component này

export const FooterSection = () => {
  const pathname = usePathname();
  const router = useRouter(); // (Vẫn giữ router nếu bạn cần dùng ở đâu đó)

  // 🎯 Hàm xử lý khi click link (đã tối ưu)
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === pathname || href === "#") {
      e.preventDefault();

      // Hiệu ứng nảy nhẹ (bounce)
      document.body.animate(
        [
          { transform: "translateY(0px)" },
          { transform: "translateY(-10px)" },
          { transform: "translateY(0px)" },
        ],
        { duration: 600, easing: "ease-in-out" }
      );

      // Cuộn lên đầu siêu mượt
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Không cần 'else'
  };

  return (
    <>
      <footer className="bg-[#041122] text-white py-12 px-6 md:px-12 lg:px-20 md:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="flex flex-col items-start">
              {/* 👇 THAY ĐỔI: Dùng <Link> và onClick */}
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className="inline-block"
              >
                <div className="mb-11 md:pl-2 self-start transform -translate-x-11 md:translate-x-0">
                  <Image
                    src="/assets/logoLight.png"
                    alt="LSJ TAX"
                    width={300}
                    height={40}
                    priority
                  />
                </div>

              </Link>
              {/* 👆 KẾT THÚC THAY ĐỔI */}

              <div className="arial-nova text-sm flex items-center gap-2 font-medium mb-2 md:pl-11 justify-start">
                <MapPin size={20} className="text-[#BC9750]" />
                <a
                  href="https://maps.app.goo.gl/XvLFSm3DThKU9fx96"
                  className="hover:text-[#BC9750] transition-colors"
                  target="_blank" // (Link ngoài nên thêm target)
                  rel="noopener noreferrer"
                >
                  771 Ngo Quyen, An Hai Ward, Vietnam
                </a>
              </div>

              <div className="arial-nova text-sm flex items-center gap-2 font-medium md:pl-11 justify-start">
                <Mail size={20} className="text-[#BC9750]" />
                <a
                  href="mailto:lsjtax@info.com"
                  className="hover:text-[#BC9750] transition-colors"
                >
                  lsjtax@info.com
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-6 mb-8">
                {/* COMPANY */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    COMPANY
                  </h4>
                  <ul className="arial-nova space-y-1">
                    {[
                      { name: "About us", href: "/about" },
                      { name: "Resources", href: "/blog" },
                      { name: "Contact Us", href: "/contact" },
                    ].map((item) => (
                      <li key={item.name}>
                        {/* 👇 THAY ĐỔI: Dùng <Link> và onClick */}
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={`block text-sm text-gray-300 transition-all duration-300 transform hover:translate-x-1 ${pathname === item.href
                              ? "text-[#BC9750]"
                              : "hover:text-[#BC9750]"
                            }`}
                        >
                          {item.name}
                        </Link>
                        {/* 👆 KẾT THÚC THAY ĐỔI */}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SERVICES */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    SERVICES
                  </h4>
                  <ul className="arial-nova space-y-1">
                    {[
                      {
                        name: "Personal Income Tax Strategy",
                        href: "/services/personalIncome",
                      },
                      {
                        name: "Corporate Tax Structuring",
                        href: "/services/corporate",
                      },
                      {
                        name: "Cross-Border VAT Optimisation",
                        href: "/services/vat",
                      },
                    ].map((item) => (
                      <li key={item.name}>
                        {/* 👇 THAY ĐỔI: Dùng <Link> và onClick */}
                        <Link
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={`block text-sm text-gray-300 transition-all duration-300 transform hover:translate-x-1 ${pathname === item.href
                              ? "text-[#BC9750]"
                              : "hover:text-[#BC9750]"
                            }`}
                        >
                          {item.name}
                        </Link>
                        {/* 👆 KẾT THÚC THAY ĐỔI */}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FOLLOW US */}
                <div>
                  <h4 className="trajan-pro text-[#BC9750] text-sm uppercase tracking-wider mb-4 font-medium">
                    FOLLOW US
                  </h4>
                  <ul className="arial-nova space-y-1">
                    {["Linkedin", "Instagram", "Facebook", "X"].map((item) => (
                      <li key={item}>
                        {/* (Giữ nguyên thẻ <a> vì đây là link placeholder #) */}
                        <a
                          href="#"
                          onClick={(e) => handleLinkClick(e, "#")}
                          className="block text-sm text-gray-300 hover:text-[#BC9750] transition-all duration-300 transform hover:translate-x-1"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom */}
              <div className="arial-nova flex justify-between items-center pt-9 border-none">
                {/* (Giữ nguyên thẻ <a> vì đây là link placeholder #) */}
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, "/privacy")}
                  className="text-xs text-white hover:text-[#BC9750] transition-colors"
                >
                  Privacy Policy
                </a>
                <div className="text-xs text-white">
                  2025 © LJS | TAX. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;