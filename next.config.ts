import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        API_URL: process.env.API_URL,
        S3_URL: process.env.S3_URL,
        AUTH_REDIRECT: process.env.AUTH_REDIRECT,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "memphis.nyc3.cdn.digitaloceanspaces.com",
            },
        ],
    },
};

export default nextConfig;
