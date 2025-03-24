"use client";

import AuthRoute from "@/components/AuthRoute";
import { Response } from "@/models/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { AuthContext } from "../Providers";


const formSchema = z.object({
    cid: z.number().positive(),
    fullName: z.string().nonempty(),
    email: z.string().email(),
    organization: z.string().nonempty(),
    estimatedPilots: z.number().positive(),
    start: z.date(),
    duration: z.string().nonempty(),
});

export default function StaffingRequest() {

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cid: authContext?.user?.cid ?? 0,
            fullName: authContext?.user?.fullName ?? "",
            email: authContext?.user?.email ?? "",
            organization: "",
            estimatedPilots: 0,
            start: new Date(),
            duration: "1:00",
        },
    });

    useEffect(() => {
        document.title = "Staffing Request | Memphis ARTCC";
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staffingrequests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(values),
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                toast.error(`Error creating staffing request:\n${error.message}`);
                setLoading(false);
                return;
            }
            toast.success("Staffing request created successfully");
            setLoading(false);
            router.push("/");
            return;
        }).catch((error) => {
            console.log(error);
            toast.error(error);
            setLoading(false);
            return;
        });
    }

    return (
        <AuthRoute>
            <div className="w-100 text-center text-white">
                <div className="flex flex-row justify-center">
                    <div className="mb-4 text-center text-3xl">
                    Staffing Request
                    </div>
                </div>
                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                    testing
                </div>
            </div>
        </AuthRoute>
    );
}