import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Toaster } from "sonner";
import "@/app/globals.css";
import { Providers } from "./providers";
import { Suspense } from "react";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ubuntu.className}`}>
                <Providers>
                    <Suspense>
                        <Navigation />
                        {children}
                        <Toaster />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
