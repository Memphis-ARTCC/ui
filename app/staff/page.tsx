"use client";

import { useEffect } from "react";

export default function StaffingRequest() {

    useEffect(() => {
        document.title = "Staff | Memphis ARTCC";
    }, []);

    return (
        <div className="w-100 text-center text-white">
            <div className="flex flex-row justify-center">
                <div className="mb-4 text-center text-3xl">
                    ARTCC Staff
                </div>
            </div>
            <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                testing
            </div>
        </div>
    );
}