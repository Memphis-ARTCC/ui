"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    return (
        <div className="bg-gray-300 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
            <div className="pt-2 m-5">
                <h2 className="pb-4 mt-3 text-2xl text-center">
                    404 - Page Not Found
                </h2>
                <div className="flex flex-col items-center py-4 text-lg">
                    <button className="w-24 p-2 text-center transition-all rounded-md shadow-md bg-sky-500 hover:bg-sky-400 dark:bg-sky-800 dark:hover:bg-sky-700"
                        onClick={router.back}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}