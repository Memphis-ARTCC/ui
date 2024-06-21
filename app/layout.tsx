import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./styles.scss";
import { Providers } from "./providers";
import { Suspense } from "react";
import { Navigation } from "@/components/shared/Navigation";
import { Col, Container, Row } from "react-bootstrap";
import { Footer } from "@/components/shared/Footer";
import { Sidebar } from "@/components/shared/Sidebar";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Home | Memphis ARTCC",
    description: "Memphis ARTCC"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ubuntu.className} flex flex-col h-screen bg-zinc-900`}>
                <Providers>
                    <Suspense>
                        <Navigation />
                        <div className="mb-auto">
                            <Container>
                                <Row>
                                    <Col lg="4">
                                        <Sidebar />
                                    </Col>
                                    <Col lg="8">
                                        {children}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <Footer />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
