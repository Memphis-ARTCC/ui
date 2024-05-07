import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Toaster } from "sonner";
import "@/app/globals.css";
import { Providers } from "./providers";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Sidebar } from "@/components/sidebar";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ubuntu.className} flex flex-col h-screen`}>
                <Providers>
                    <Suspense>
                        <Navigation />
                        <div className="mb-auto">
                            <Container>
                                <div className="grid grid-cols-4 gap-10">
                                    <div>
                                        <Sidebar />
                                    </div>
                                    <div className="col-span-3">
                                        {children}
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <Toaster />
                        <Footer />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
