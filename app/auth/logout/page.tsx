"use client";

import { AuthContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Logout() {

    const auth = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (auth?.user) {
            auth?.setUser(null);
            localStorage.removeItem("accessToken");
            router.push("/");
        }
    });

    return (
        <div className="container text-white">
            Logging out...
        </div>
    );
}