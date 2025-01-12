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

export default function Roster() {

    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [roster, setRoster] = useState<RosterUser[]>([] as RosterUser[]);

    const [canRoster, setCanRoster] = useState<boolean>(false);

    useEffect(() => {
        document.title = "Roster | Memphis ARTCC";
        const fetchRoster = async () => {
            const response = await fetch(`${process.env.API_URL}/users/roster`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
            );
            if (!response.ok) {
                throw new Error(`HTTP error!\nstatus: ${response.status}\nerror: ${response.statusText}`);
            }
            return await response.json() as Response<RosterUser[]>;
        };
        fetchRoster()
            .then((response) => {
                setRoster(response.data);
            })
            .catch((error) => {
                console.log(`Error fetching roster:\n${error}`);
                toast.error("Error fetching roster");
            });
        setCanRoster(authContext?.hasRoles(CAN_ROSTER) ?? false);
        setLoading(false);
    }, [authContext]);

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
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white text-center">Status</TableHead>
                                <TableHead className="text-white text-center">Ground</TableHead>
                                <TableHead className="text-white text-center">Tower</TableHead>
                                <TableHead className="text-white text-center">Approach</TableHead>
                                <TableHead className="text-white text-center">Center</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roster.map((user) => (
                                <TableRow key={user.cid}>
                                    <TableCell className="text-left min-w-[300px]">
                                        <div className="flex flex-col">
                                            <div className="text-lg">
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
                                                <div>
                                                    {user.roles.at(0)?.name} ({getShortRatingString(user.rating)})
                                                </div>
                                            ) : (
                                                <div>
                                                    {getRatingString(user.rating)} ({getShortRatingString(user.rating)})
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getUserStatusString(user.status)}
                                    </TableCell>
                                    {user.ground ? (
                                        <>
                                            {user.ground.solo ? (
                                                <TableCell className="bg-yellow-500">
                                                    Solo
                                                </TableCell>

                                            ) : (
                                                <TableCell className="bg-success">
                                                    <Check size={24} />
                                                </TableCell>
                                            )}
                                        </>
                                    ) : (
                                        <TableCell>
                                            <div className="text-center"> - </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthRoute>
    );
}