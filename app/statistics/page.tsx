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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Response } from "@/models/response";
import { Stats } from "@/models/stats";
import { getUserStatusString } from "@/utils/enums";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../Providers";

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats?month=${month}&year=${year}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching statistics:\n${error.message}`);
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
                    console.log(error);
                    toast.error(error);
                    setLoading(false);
                });
        }
        const currentParams = Object.fromEntries(params.entries());
        const newParams = { ...currentParams, month: `${month}`, year: `${year}` };
        const queryString = new URLSearchParams(newParams).toString();

        router.push(`?${queryString}`, { scroll: false });
        setLoading(false);
    }, [authContext, month, params, router, year]);

    const nextMonth = () => {
        setLoading(true);

        setMonth((prevMonth) => {
            let newMonth = prevMonth + 1;
            let newYear = year;
            if (newMonth > 12) {
                newMonth = 1;
                newYear += 1;
            }
            setYear(newYear);
            return newMonth;
        });
    };

    const previousMonth = () => {
        setLoading(true);
        setMonth((prevMonth) => {
            let newMonth = prevMonth - 1;
            let newYear = year;
            if (newMonth < 1) {
                newMonth = 12;
                newYear -= 1;
            }
            setYear(newYear);
            return newMonth;
        });
    };

    return (
        <AuthRoute>
            <div className="w-100 text-center text-white">
                <div className="mb-4 flex items-center justify-center">
                    <div className="flex items-center gap-6">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ChevronLeft className="size-8 cursor-pointer text-white transition hover:text-gray-400" onClick={previousMonth} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Previous Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="text-center text-3xl text-white">
                            Statistics
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ChevronRight className="size-8 cursor-pointer text-white transition hover:text-gray-400" onClick={nextMonth} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Next Month</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                    <Table className="rounded-2xl bg-gray-700 p-3 shadow-md">
                        <TableHeader>
                            <TableRow>
                                <TableHead colSpan={8} className="text-center text-3xl text-white">
                                    {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
                                </TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead className="text-nowrap text-lg text-white">Name</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Status</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Delivery</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Ground</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Tower</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Tracon</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Center</TableHead>
                                <TableHead className="text-nowrap text-center text-lg text-white">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.length > 0 ? (
                                <>
                                    {stats.map((statsEntry) => (
                                        <TableRow key={statsEntry.cid} className="h-full">
                                            <TableCell className="text-nowrap text-left text-lg">
                                                <span className="font-bold">{statsEntry.firstName} {statsEntry.lastName}</span>
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {getUserStatusString(statsEntry.status)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.deliveryHours.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.groundHours.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.towerHours.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.traconHours.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.centerHours.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-lg">
                                                {statsEntry.totalHours.toFixed(2)}
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