"use client";

import { AuthContext, HeaderContext } from "@/app/Providers";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";


export const Navigation = () => {

    const auth = useContext(AuthContext);
    const image = useContext(HeaderContext);
    const router = useRouter();

    const [headerImage, setheaderImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [staff, setStaff] = useState<boolean>(false);
    const [seniorStaff, setSeniorStaff] = useState<boolean>(false);
    const [trainingStaff, setTrainingStaff] = useState<boolean>(false);
    const [seniorTrainingStaff, setSeniorTrainingStaff] = useState<boolean>(false);

    useEffect(() => {
        if (!auth?.user) {
            const token = localStorage.getItem("accessToken");
            if (token) {
                auth?.setUser(jwtDecode(token));
                if (auth?.user?.exp ?? 0 < Date.now() / 1000) {
                    auth?.logout();
                    router.push("/auth/login");
                }
            }
        }
        setheaderImage(image ?? "header-image-1");
        setName(auth?.user?.fullName ?? "");
        setLoggedIn(auth?.isLoggedIn() ?? false);
        setStaff(auth?.isStaff() ?? false);
        setSeniorStaff(auth?.isSeniorStaff() ?? false);
        setTrainingStaff(auth?.isTrainingStaff() ?? false);
        setSeniorTrainingStaff(auth?.isSeniorTrainingStaff() ?? false);
    }, [auth, image, router]);


    return (
        <>
            <div className={`max-h-[190px] min-h-[190px] w-full ${headerImage}`}></div>
            <Navbar collapseOnSelect expand="lg" className="mb-8 bg-gray-700">
                <Container>
                    <Link href="/" className="mr-5 flex" passHref>
                        <Navbar.Brand className="align-middle" as="span">
                            <Image src={`${process.env.NEXT_PUBLIC_S3_URL}/images/zme_logo.png`} alt="Memphis ARTCC" width={100} height={100} />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Pilots" id="pilots-nav" className="mx-2 transition-all delay-150 ease-in-out">
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
                                <Link href={`/statistics?month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`} className="text-decoration-none" passHref>
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
                            {trainingStaff ? (
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
                                    {seniorTrainingStaff ? (
                                        <Link href="/training/ots" className="text-decoration-none" passHref>
                                            <NavDropdown.Item as="span">
                                                OTS Management
                                            </NavDropdown.Item>
                                        </Link>
                                    ) : <></>}
                                    {seniorStaff ? (
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
                            {staff ? (
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
                                    {seniorStaff ? (
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
                            {loggedIn ? (
                                <NavDropdown title={name} id="user-nav">
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