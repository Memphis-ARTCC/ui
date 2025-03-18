"use client";

import { Trophy } from "lucide-react";
import { Token } from "@/models/auth/token";
import { Stats } from "@/models/stats";
import { Response } from "@/models/response";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Providers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


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
        <div className="text-white w-100 text-center">
            <div className="text-3xl text-center">
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
                            <button className="w-auto p-2 mt-4 text-center transition-all rounded-md shadow-md bg-sky-800 hover:bg-sky-700"
                                onClick={() => router.push("/visit")}>
                                Become a Visitor
                            </button>
                        </div>
                    ) : <></>}
                </div>
            </div>
            <div className="text-3xl text-center mb-4">
                News
            </div>
            <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                Testing
            </div>
            <div className="text-3xl text-center my-4">
                Top Controllers
            </div>
            <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                {top.length > 0 ? (
                    <div className="flex items-end justify-center gap-8 mt-10">
                        <div className="flex flex-col items-center w-32 h-24">
                            <Trophy className="w-8 h-8 text-gray-400 mb-1" />
                            {top[1] ? (
                                <>
                                    <span className="text-lg">{top[1].firstName} {top[1].lastName}</span>
                                    <span className="text-lg">{top[1].totalHours} hrs</span>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div className="flex flex-col items-center w-40 h-28">
                            <Trophy className="w-10 h-10 text-yellow-500 mb-1" />
                            {top[0] ? (
                                <>
                                    <span className="text-lg">{top[0].firstName} {top[0].lastName}</span>
                                    <span className="text-lg">{top[0].totalHours} hrs</span>
                                </>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div className="flex flex-col items-center w-32 h-24">
                            <Trophy className="w-8 h-8 text-orange-600 mb-1" />
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