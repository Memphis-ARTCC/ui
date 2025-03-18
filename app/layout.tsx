import { Ubuntu } from "next/font/google";
import "./globals.scss";
import { Suspense } from "react";
import Providers from "./Providers";
import { Navigation } from "@/components/Navigation";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from "react-toastify";

const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

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