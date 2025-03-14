"use client";

import AuthRoute from "@/components/AuthRoute";
import { useEffect } from "react";

export default function StaffingRequest() {


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