"use client";

import { Token } from "@/models/auth/token";
import { Response } from "@/models/response";
import { Stats } from "@/models/stats";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "./Providers";

export default function Home() {
    const auth = useContext(AuthContext);
    const router = useRouter();

    const [user, setUser] = useState(null as Token | null);
    const [isMember, setIsMember] = useState(false);

    const [loadingTop, setLoadingTop] = useState(true);

    const [top, setTop] = useState([] as Stats[]);

    useEffect(() => {
        document.title = "Home | Memphis ARTCC";
        if (auth?.user) {
            setUser(auth.user);
            setIsMember(auth.user.isMember);
        }
        const fetchTopControllers = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/top`, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching top controllers:\n${error.message}`);
            }
            return await response.json() as Response<Stats[]>;
        };
        fetchTopControllers()
            .then((response) => {
                setTop(response.data);
                setLoadingTop(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
                setLoadingTop(false);
            });
    }, [auth]);

    return (
        <div className="w-100 text-center text-white">
            <div className="text-center text-3xl">
                Virtual Memphis ARTCC
            </div>
            <div className="mx-4">
                <div className="py-4 text-lg">
                    <div className="mb-4">
                        Welcome to the Virtual Memphis ARTCC! The Virtual Memphis ARTCC is a thriving community comprised of aviation enthusiasts from around the world
                        providing simulated Air Traffic Control services to pilots using the VATSIM network. As the virtual representation of the real world Memphis ARTCC,
                        our controllers control with authenticity and professionalism, closely duplicating real world procedures within our airspace,
                        while also maintaining the fun that embodies the VATSIM network.Our airspace includes most of Tennessee, Mississippi, and Arkansas,
                        with its centerpiece being the busiest cargo airport in the continental United States.
                    </div>
                    {user == null || (user && !isMember) ? (
                        <div className="flex flex-col items-center">
                            If you would like to become a visitor, please click the button below.
                            <br />
                            <button className="mt-4 w-auto rounded-md bg-sky-800 p-2 text-center shadow-md transition-all hover:bg-sky-700"
                                onClick={() => router.push("/visit")}>
                                Become a Visitor
                            </button>
                        </div>
                    ) : <></>}
                </div>
            </div>
            <div className="mb-4 text-center text-3xl">
                News
            </div>
            <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                Testing
            </div>
            <div className="my-4 text-center text-3xl">
                Top Controllers
            </div>
            <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                {top.length > 0 ? (
                    <div className="flex items-end justify-center gap-8">
                        <div className="flex h-24 w-32 flex-col items-center">
                            <Trophy className="mb-1 size-8 text-gray-400" />
                            {top[1] ? (
                                <>
                                    <span className="text-lg">{top[1].firstName} {top[1].lastName}</span>
                                    <span className="text-lg">{top[1].totalHours} hrs</span>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div className="flex h-28 w-40 flex-col items-center">
                            <Trophy className="mb-1 size-10 text-yellow-500" />
                            {top[0] ? (
                                <>
                                    <span className="text-lg">{top[0].firstName} {top[0].lastName}</span>
                                    <span className="text-lg">{top[0].totalHours} hrs</span>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div className="flex h-24 w-32 flex-col items-center">
                            <Trophy className="mb-1 size-8 text-orange-600" />
                            {top[2] ? (
                                <>
                                    <span className="text-lg">{top[2].firstName} {top[2].lastName}</span>
                                    <span className="text-lg">{top[2].totalHours} hrs</span>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {loadingTop ? (
                            <div className="text-xl">Loading...</div>
                        ) : (
                            <div className="text-xl">No top controllers found</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}