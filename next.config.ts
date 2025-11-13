// File: next.config.js (Bên dự án CLIENT)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lewis.vietnamsourcing.co",
        pathname: "/**",
      },
    ],
  },
  
  // CHỨC NĂNG MỚI: Thêm "redirects" (Chuyển Hướng)
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: 'https://lewis-web.vercel.app/dashboard',
        permanent: false, // Dùng `false` cho local, `true` khi deploy
      },
      {
        source: '/aboutUs', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/aboutUs',
        permanent: false,
      },
      {
        source: '/categories', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/categories',
        permanent: false,
      },
      {
        source: '/posts', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/posts',
        permanent: false,
      },
      {
        source: '/preview', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/preview',
        permanent: false,
      },
      {
        source: '/review', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/review',
        permanent: false,
      },
      {
        source: '/users', // Chuyển hướng tất cả các trang con
        destination: 'https://lewis-web.vercel.app/users',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;