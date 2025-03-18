"use client";

import AuthRoute from "@/components/AuthRoute";
import { RosterUser } from "@/models/rosterUser";
import { Response } from "@/models/response";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers";
import { CAN_ROSTER } from "@/utils/constants";
import { getRatingString, getShortRatingString, getUserStatusString } from "@/utils/enums";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Check } from "lucide-react";
import Spinner from "@/components/Spinner";
import { Certification } from "@/models/certification";

type CertificationProps = {
    certification: Certification;
}

const Certifiation = ({ certification }: CertificationProps) => {
    return (
        <>
            {certification.solo ? (
                <TableCell className="text-yellow-500 text-lg">
                    S
                </TableCell>
            ) : (
                <TableCell>
                    <div className="flex justify-center">
                        <Check size={24} className="text-green-600" />
                    </div>
                </TableCell>
            )}
        </>
    );
};


export default function Roster() {

    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [roster, setRoster] = useState<RosterUser[]>([] as RosterUser[]);

    const [canRoster, setCanRoster] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Roster | Memphis ARTCC";
        const fetchRoster = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/roster`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
            );
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching roster:\n${error.message}`);
            }
            return await response.json() as Response<RosterUser[]>;
        };
        if (authContext?.isLoggedIn()) {
            fetchRoster()
                .then((response) => {
                    setRoster(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error);
                    setLoading(false);
                });
        }
        setCanRoster(authContext?.hasRoles(CAN_ROSTER) ?? false);
    }, [authContext, loading]);

    return (
        <AuthRoute>
            <div className="text-white w-100 text-center">
                <div className="flex flex-row justify-center">
                    <div className="text-3xl text-center mb-4">
                        Roster
                    </div>
                </div>
                <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                    <Table className="bg-gray-700 rounded-2xl shadow-md p-3">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white text-lg text-nowrap">Name</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Status</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Tier 2 Ground</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Tier 2 Tower</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Tier 2 Tracon</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Center</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roster.length > 0 ? (
                                <>
                                    {roster.map((user) => (
                                        <TableRow key={user.cid} className="h-full">
                                            <TableCell className="text-left min-w-[300px]">
                                                <div className="flex flex-col">
                                                    <div className="text-xl">
                                                        {canRoster ? (
                                                            <Link href={`/roster/edit/${user.cid}`}>
                                                                <span className="font-bold">{user.name}</span> ({user.initials})
                                                            </Link>
                                                        ) : (
                                                            <>
                                                                <span className="font-bold">{user.name}</span> ({user.initials})
                                                            </>
                                                        )}
                                                    </div>
                                                    {user.roles && user.roles.length > 0 ? (
                                                        <div className="text-lg">
                                                            {user.roles.at(0)?.name} ({getShortRatingString(user.rating)})
                                                        </div>
                                                    ) : (
                                                        <div className="text-lg">
                                                            {getRatingString(user.rating)} ({getShortRatingString(user.rating)})
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {getUserStatusString(user.status)}
                                            </TableCell>
                                            {user.ground ? (
                                                <Certifiation certification={user.ground} />
                                            ) : (
                                                <TableCell>
                                                    <div className="text-center"> - </div>
                                                </TableCell>
                                            )}
                                            {user.tower ? (
                                                <Certifiation certification={user.tower} />
                                            ) : (
                                                <TableCell>
                                                    <div className="text-center"> - </div>
                                                </TableCell>
                                            )}
                                            {user.tracon ? (
                                                <Certifiation certification={user.tracon} />
                                            ) : (
                                                <TableCell>
                                                    <div className="text-center"> - </div>
                                                </TableCell>
                                            )}
                                            {user.center ? (
                                                <Certifiation certification={user.center} />
                                            ) : (
                                                <TableCell>
                                                    <div className="text-center"> - </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <Spinner />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">
                                                No users found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthRoute>
    );
}