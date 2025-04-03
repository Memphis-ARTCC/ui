"use client";

import Spinner from "@/components/Spinner";
import { Response } from "@/models/response";
import { Staff } from "@/models/staff";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

type StaffPositionProps = {
    position: string;
    email: string | undefined;
    name: string | undefined;
};

type StaffTeamProps = {
    name: string;
    team: string[] | undefined;
    email: string | undefined;
};

const StaffPosition = ({ position, email, name }: StaffPositionProps) => {
    return (
        <div className="mx-10 my-4 border-b border-gray-500 p-2">
            <div className="text-center text-lg font-bold">
                {position}
            </div>
            <a className="text-md text-decoration-underline text-center" href={`mailto:${email}`}>
                {email}
            </a>
            <div className="text-center text-lg font-bold">
                {name != null ?
                    name :
                    "Vacant"
                }
            </div>
        </div>
    );
};

const StaffTeam = ({ name, team, email }: StaffTeamProps) => {
    return (
        <div className="mx-10 my-4 border-b border-gray-500 p-2">
            <div className="text-center text-lg font-bold">
                {name}
            </div>
            <a className="text-md text-decoration-underline text-center" href={`mailto:${email}`}>
                {email}
            </a>
            <div className="text-center text-lg font-bold">
                {team != null && team?.length > 0 ? (
                    team.map((member, index) => (
                        <div key={index}>
                            {member}
                        </div>
                    ))
                ) : (
                    "None"
                )}
            </div>
        </div>
    );
};

export default function StaffPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [staff, setStaff] = useState({} as Staff);

    useEffect(() => {
        document.title = "Staff | Memphis ARTCC";
        const fetchStaff = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/staff`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching staff:\n${error.message}`);
            }
            return await response.json() as Response<Staff>;
        };

        fetchStaff()
            .then((response) => {
                setStaff(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Failed to load staff information");
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-100 text-center text-white">
            <div className="flex flex-row justify-center">
                <div className="mb-4 text-center text-3xl">
                    ARTCC Staff
                </div>
            </div>
            <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                {!loading ? (
                    <>
                        <Row>
                            <Col>
                                <StaffPosition position="Air Traffic Manager" email={staff.atmEmail} name={staff.atm} />
                            </Col>
                            <Col>
                                <StaffPosition position="Deputy Air Traffic Manager" email={staff.datmEmail} name={staff.datm} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffPosition position="Training Administrator" email={staff.taEmail} name={staff.ta} />
                            </Col>
                            <Col>
                                <StaffPosition position="Assistant Training Administrator" email={staff.ataEmail} name={staff.ata} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffPosition position="Webmaster" email={staff.wmEmail} name={staff.wm} />
                            </Col>
                            <Col>
                                <StaffPosition position="Assistant Webmaster" email={staff.awmEmail} name={staff.awm} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffTeam name="Web Team" team={staff.webTeam} email={staff.webTeamEmail} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffPosition position="Events Coordinator" email={staff.ecEmail} name={staff.ec} />
                            </Col>
                            <Col>
                                <StaffPosition position="Assistant Events Coordinator" email={staff.aecEmail} name={staff.aec} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffTeam name="Events Team" team={staff.eventsTeam} email={staff.eventsTeamEmail} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffPosition position="Facility Engineer" email={staff.feEmail} name={staff.fe} />
                            </Col>
                            <Col>
                                <StaffPosition position="Assistant Facility Engineer" email={staff.afeEmail} name={staff.afe} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffTeam name="Social Media Team" team={staff.socialMediaTeam} email={staff.socialMediaTeamEmail} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <StaffTeam name="Instructors" team={staff.ins} email={staff.insEmail} />
                            </Col>
                            <Col>
                                <StaffTeam name="Mentors" team={staff.mtr} email={staff.mtrEmail} />
                            </Col>
                        </Row>
                    </>
                ) : <Spinner />}
            </div>
        </div>
    );
}