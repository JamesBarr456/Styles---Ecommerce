/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'encrypted-tbn2.gstatic.com',
          },
          {
            protocol: 'https',
            hostname: 'www.dropbox.com',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
      
        ],
      },
};

export default nextConfig;
