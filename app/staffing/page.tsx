"use client";

import AuthRoute from "@/components/AuthRoute";
import { useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function StaffingRequest() {

    const formSchema = z.object({
        name: z.string().min(1),
        icao: z.string().length(4),
    });

    useEffect(() => {
        document.title = "Staffing Request | Memphis ARTCC";
    }, []);

    return (
        <AuthRoute>
            <div className="text-white w-100 text-center">
                <div className="flex flex-row justify-center">
                    <div className="text-3xl text-center mb-4">
                    Staffing Request
                    </div>
                </div>
                <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                    testing
                </div>
            </div>
        </AuthRoute>
    );
}