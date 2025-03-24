import "./globals.scss";

import { Navigation } from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Ubuntu } from "next/font/google";
import { Suspense } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import Providers from "./Providers";


const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ubuntu.className} flex h-screen flex-col bg-zinc-900`}>
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
                        <ToastContainer
                            position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}