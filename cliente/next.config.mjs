/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'metropolitanhost.com',
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
