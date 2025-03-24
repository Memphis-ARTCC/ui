"use client";

import { useEffect } from "react";

export default function Login() {

    useEffect(() => {
        window.location.assign(`${process.env.NEXT_PUBLIC_AUTH_REDIRECT}`);
    }, []);

    return (
        <div className="container text-white">
            Redirecting...
        </div>
    );
}