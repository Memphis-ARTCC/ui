"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import AuthRoute from "@/components/AuthRoute";
import { Stats } from "@/models/stats";
import { Response } from "@/models/response";
import { useContext, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { getUserStatusString } from "@/utils/enums";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers";
import { useRouter, useSearchParams } from "next/navigation";

export default function StaffingRequest() {

    const authContext = useContext(AuthContext);
    const router = useRouter();
    const params = useSearchParams();

    const [month, setMonth] = useState<number>(parseInt(params.get("month") as string));
    const [year, setYear] = useState<number>(parseInt(params.get("year") as string));

    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<Stats[]>([] as Stats[]);

    useEffect(() => {
        document.title = "Statistics | Memphis ARTCC";
        const fetchStats = async () => {
            const response = await fetch(`${process.env.API_URL}/stats?month=${month}&year=${year}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error!\nstatus: ${response.status}\nerror: ${response.statusText}`);
            }
            return await response.json() as Response<Stats[]>;
        };
        if (authContext?.isLoggedIn()) {
            fetchStats()
                .then((response) => {
                    setStats(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(`Error fetching roster:\n${error}`);
                    toast.error("Error fetching roster");
                    setLoading(false);
                });
        }
    }, [authContext, router, month, year]);

    async function nextMonth() {
        setLoading(true);
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
        router.push(`/statistics?month=${month}&year=${year}`);
    }

    async function previousMonth() {
        setLoading(true);
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
        router.push(`/statistics?month=${month}&year=${year}`);
    }

    return (
        <AuthRoute>
            <div className="text-white w-100 text-center">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center gap-6">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ChevronLeft className="w-8 h-8 text-white cursor-pointer hover:text-gray-400 transition" onClick={previousMonth} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="text-3xl text-center text-white">
                            Statistics
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ChevronRight className="w-8 h-8 text-white cursor-pointer hover:text-gray-400 transition" onClick={nextMonth} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Next Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                    <Table className="bg-gray-700 rounded-2xl shadow-md p-3">
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={8} className="text-white text-3xl text-center">
                                    {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
                                </TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead className="text-white text-lg text-nowrap">Name</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Status</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Delivery</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Ground</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Tower</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Tracon</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Center</TableHead>
                                <TableHead className="text-white text-center text-lg text-nowrap">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.length > 0 ? (
                                <>
                                    {stats.map((statsEntry) => (
                                        <TableRow key={statsEntry.cid} className="h-full">
                                            <TableCell className="text-left text-lg text-nowrap">
                                                <span className="font-bold">{statsEntry.firstName} {statsEntry.lastName}</span>
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {getUserStatusString(statsEntry.status)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.deliveryHours}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.groundHours}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.towerHours}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.traconHours}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.centerHours}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.totalHours}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <Spinner />
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center">
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