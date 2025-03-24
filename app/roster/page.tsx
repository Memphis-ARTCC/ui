"use client";

import AuthRoute from "@/components/AuthRoute";
import Spinner from "@/components/Spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Certification } from "@/models/certification";
import { Response } from "@/models/response";
import { RosterUser } from "@/models/rosterUser";
import { CAN_ROSTER } from "@/utils/constants";
import { getRatingString, getShortRatingString, getUserStatusString } from "@/utils/enums";
import { Check } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../Providers";


type CertificationProps = {
    certification: Certification;
}

const Certifiation = ({ certification }: CertificationProps) => {
    return (
        <>
            {certification.solo ? (
                <TableCell className="text-lg text-yellow-500">
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
            <div className="w-100 text-center text-white">
                <div className="flex flex-row justify-center">
                    <div className="mb-4 text-center text-3xl">
                        Roster
                    </div>
                </div>
                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                    <Table className="rounded-2xl bg-gray-700 p-3 shadow-md">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-nowrap text-lg text-white">Name</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Status</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Tier 2 Ground</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Tier 2 Tower</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Tier 2 Tracon</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Center</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roster.length > 0 ? (
                                <>
                                    {roster.map((user) => (
                                        <TableRow key={user.cid} className="h-full">
                                            <TableCell className="min-w-[300px] text-left">
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