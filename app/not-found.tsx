"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="w-100 rounded-md shadow-sm dark:text-white ">
            <div className="m-5 pt-2">
                <h2 className="mt-3 pb-4 text-center text-2xl text-white">
                    404 - Page Not Found
                </h2>
                <div className="flex flex-col items-center py-4 text-lg">
                    <button className="mt-4 w-auto rounded-md bg-blue-700 p-2 text-center text-white shadow-md transition-all hover:bg-blue-600" onClick={goBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}