"use client";

import { AuthContext, HeaderContext } from "@/app/providers";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";

export const Navigation = () => {

    const auth = useContext(AuthContext);
    const image = useContext(HeaderContext);

    useEffect(() => {
        if (!auth?.user) {
            const token = localStorage.getItem("accessToken");
            if (token) {
                auth?.setUser(jwtDecode(token));
            }
        }
    }, [auth]);

    return (
        <>
            <div className={`min-h-[190px] max-h-[190px] w-full ${image ?? "header-image-1"}`}></div>
            <Navbar collapseOnSelect expand="lg" className="mb-8 bg-gray-700">
                <Container>
                    <Link href="/" className="flex mr-5" passHref>
                        <Navbar.Brand className="align-middle" as="span">
                            <Image src={`${process.env.SPACES_URL}/images/zme_logo.png`} alt="Memphis ARTCC" width={100} height={100} priority />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Pilots" id="pilots-nav" className="mx-2">
                                <Link href="/airports" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Airports
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/staffing" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Staffing Request
                                    </NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                            <NavDropdown title="Controllers" id="controllers-nav" className="mx-2">
                                <Link href="/staff" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Staff
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/roster" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Roster
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/statistics" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Statistics
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/files" className="text-decoration-none" passHref>
                                    <NavDropdown.Item as="span">
                                        Files
                                    </NavDropdown.Item>
                                </Link>
                                {auth?.user != null ? (
                                    <Link href="/trainingschedule" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Training Schedule
                                        </NavDropdown.Item>
                                    </Link>
                                ) : <></>}
                            </NavDropdown>
                            <Link href="/feedback" className="text-decoration-none mx-2" passHref>
                                <Nav.Link as="span">Feedback</Nav.Link>
                            </Link>
                            <Link href="/events" className="text-decoration-none mx-2" passHref>
                                <Nav.Link as="span">Events</Nav.Link>
                            </Link>
                            {auth?.user && auth.isTrainingStaff() ? (
                                <NavDropdown title="Training Management" id="training-management-nav" className="mx-2">
                                    <Link href="/training/tickets" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Training Tickets
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/training/schedule" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Training Schedule
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/training/solo" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Solo Certs
                                        </NavDropdown.Item>
                                    </Link>
                                    {auth.isSeniorTrainingStaff() ? (
                                        <Link href="/training/ots" className="text-decoration-none" passHref>
                                            <NavDropdown.Item as="span">
                                                OTS Management
                                            </NavDropdown.Item>
                                        </Link>
                                    ) : <></>}
                                    {auth.isSeniorStaff() ? (
                                        <>
                                            <Link href="/training/milestones" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Training Milestones
                                                </NavDropdown.Item>
                                            </Link>
                                            <Link href="/training/activity" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Training Activity
                                                </NavDropdown.Item>
                                            </Link>
                                        </>
                                    ) : <></>}
                                </NavDropdown>
                            ) : <></>}
                            {auth?.user && auth.isStaff() ? (
                                <NavDropdown title="ARTCC Management" id="artcc-management-nav" className="mx-2">
                                    <Link href="/management" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Dashboard
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/management/activity" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Activity Report
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/management/staffing" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Staffing Requests
                                        </NavDropdown.Item>
                                    </Link>
                                    {auth.isSeniorStaff() ? (
                                        <>
                                            <Link href="/management/feedback" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Feedback
                                                </NavDropdown.Item>
                                            </Link>
                                            <Link href="/management/settings" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Settings
                                                </NavDropdown.Item>
                                            </Link>
                                            <Link href="/management/emails" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Email Logs
                                                </NavDropdown.Item>
                                            </Link>
                                            <Link href="/management/logs" className="text-decoration-none" passHref>
                                                <NavDropdown.Item as="span">
                                                    Website Logs
                                                </NavDropdown.Item>
                                            </Link>
                                        </>
                                    ) : <></>}
                                </NavDropdown>
                            ) : <></>}
                        </Nav>
                        <Nav>
                            {auth?.user != null ? (
                                <NavDropdown title={auth.user.fullName} id="user-nav">
                                    <Link href="/profile" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Profile
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/auth/logout" className="text-decoration-none" passHref>
                                        <NavDropdown.Item as="span">
                                            Logout
                                        </NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            ) : (
                                <Link href="/auth/login" className="text-decoration-none" passHref>
                                    <Nav.Link as="span">Login</Nav.Link>
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};