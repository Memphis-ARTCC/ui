"use client";

import { AuthContext } from "@/app/Providers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "./ui/button";

type AuthRouteProps = {
    children: React.ReactNode;
    roles?: string[];
};

const AuthRoute = ({children, roles}: AuthRouteProps) => {

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setAuth(false);
        if (!authContext?.isLoggedIn()) {
            return;
        }
        if (roles && !authContext?.hasRoles(roles)) {
            toast.error("You do not have permission to access this page.");
            router.push("/");
            return;
        }
        setAuth(true);
    }, [authContext, roles, router]);

    return <>
        {auth ? children :
            <>
                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                    <div className="mb-4 text-center text-2xl text-white">
                        Please login with VATSIM to view this page.
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Button className="bg-success text-lg" onClick={() => router.push("/auth/login")}>Login</Button>
                    </div>
                </div>
            </>
        }
    </>;
};

export default AuthRoute;