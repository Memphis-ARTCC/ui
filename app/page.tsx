"use client";

import { useContext } from "react";
import { AuthContext } from "./providers";
import { useRouter } from "next/navigation";

export default function Home() {

    const auth = useContext(AuthContext);
    const router = useRouter();

    return (
        <div className="bg-gray-300 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
            <div className="pt-2 m-5">
                <div className="py-4 text-lg">
                    <div className="mb-4">
                        Welcome to the Virtual Memphis ARTCC! The Virtual Memphis ARTCC is a thriving community comprised of aviation enthusiasts from around the world
                        providing simulated Air Traffic Control services to pilots using the VATSIM network. As the virtual representation of the real world Memphis ARTCC,
                        our controllers control with authenticity and professionalism, closely duplicating real world procedures within our airspace,
                        while also maintaining the fun that embodies the VATSIM network.Our airspace includes most of Tennessee, Mississippi, and Arkansas,
                        with its centerpiece being the busiest cargo airport in the continental United States.
                    </div>
                    {auth?.user && !auth.user.isMember ? (
                        <div className="flex flex-col items-center">
                            If you would like to become a visitor, please click the button below.
                            <br />
                            <button className="w-auto p-2 mt-4 text-center transition-all rounded-md shadow-md bg-sky-500 hover:bg-sky-400 dark:bg-sky-800 dark:hover:bg-sky-700"
                                onClick={() => router.push("/visit")}>
                                Become a Visitor
                            </button>
                        </div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
}