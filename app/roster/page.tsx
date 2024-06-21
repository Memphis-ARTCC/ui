"use client";

import { Page } from "@/components/shared/Page";
import { useContext } from "react";
import { AuthContext } from "@/app/providers";
import Link from "next/link";

export default function Roster() {

    const auth = useContext(AuthContext);

    return (
        <Page title="Controller Roster">
            {auth?.isLoggedIn() ? (
                <p className="text-white">Welcome to the roster page!</p>
            ) : (
                <div className="bg-gray-700">
                    <div className="px-6 py-6">
                        <p className="text-white text-lg text-center">
                            To access the roster please login with your VATSIM account.
                        </p>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <Link href="/auth/login" className="bg-sky-900 hover:bg-sky-800 transition-all text-decoration-none text-white py-2 px-4 rounded text-center shadow-md">
                            Login with VATSIM
                        </Link>
                    </div>
                </div>
            )}
        </Page>
    );
}
