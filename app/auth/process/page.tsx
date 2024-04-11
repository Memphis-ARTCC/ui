"use client";

import { AuthContext } from "@/app/providers";
import { Response } from "@/models/response";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

export default function Login() {

    const auth = useContext(AuthContext);
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get("code");
    const madeRequest = useRef(false);

    useEffect(() => {
        if (!code) {
            router.push("/");
            // todo: error banner thing
        }

        if (madeRequest.current === false) {
            madeRequest.current = true;
        }
        else {
            return;
        }

        const fetchToken = async () => {
            console.log("Fetching token...");
            const response = await fetch(`${process.env.API_URL}/auth/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "Code": code })
            });
            return await response.json() as Response<string>;
        };

        fetchToken()
            .then((response) => {
                if (response.statusCode == 200) {
                    auth?.setUser(jwtDecode(response.data));
                    localStorage.setItem("accessToken", response.data);
                    router.push("/");
                } else {
                    // todo: send error banner
                    console.log(`Error processing callback:\n${response.message}`);
                }
            })
            .catch((error) => {
                error = error as Error;
                console.log(`Error processing callback:\n${error}`);
                // todo: send error banner
                router.push("/");
            });
    }, [auth, code, router]);

    return (
        <div className="container text-white">
            Processing...
        </div>
    );
}