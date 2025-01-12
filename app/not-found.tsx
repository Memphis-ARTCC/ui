"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="rounded-md shadow-sm dark:text-white w-100 ">
            <div className="pt-2 m-5">
                <h2 className="pb-4 mt-3 text-2xl text-center text-white">
                    404 - Page Not Found
                </h2>
                <div className="flex flex-col items-center py-4 text-lg">
                    <button className="w-24 p-2 text-center transition-all rounded-md shadow-md bg-sky-800 hover:bg-sky-700 text-white"
                        onClick={goBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}