"use client";

import { Token } from "@/models/auth/token";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Providers";
import { useRouter } from "next/navigation";


export default function Home() {
    const auth = useContext(AuthContext);
    const router = useRouter();

    const [user, setUser] = useState(null as Token | null);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (auth?.user) {
            setUser(auth.user);
            setIsMember(auth.user.isMember);
        }
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
                Testing
            </div>
        </div>
    );
}
