import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "memphis.nyc3.cdn.digitaloceanspaces.com",
            },
            {
                protocol: "https",
                hostname: "memphis-artcc.nyc3.digitaloceanspaces.com"
            }
        ],
    },
};

export default nextConfig;
