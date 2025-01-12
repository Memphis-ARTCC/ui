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
                <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                    <div className="text-2xl mb-4 text-white text-center">
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