/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        AUTH_REDIRECT: process.env.AUTH_REDIRECT,
        API_URL: process.env.API_URL,
        SPACES_URL: process.env.SPACES_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "memphis-artcc.nyc3.cdn.digitaloceanspaces.com",
                port: ""
            }
        ],
    }
};

export default nextConfig;
