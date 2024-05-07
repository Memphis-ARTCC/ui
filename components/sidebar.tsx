"use client";

import { useEffect, useState } from "react";
import { OnlineController } from "@/models/onlineController";
import { Response } from "@/models/response";
import { Spinner } from "./spinner";

export const Sidebar = () => {

    const [loading, setLoading] = useState(true);
    const [online, setOnline] = useState([] as OnlineController[]);

    useEffect(() => {
        fetch(`${process.env.API_URL}/onlinecontrollers`)
            .then(response => response.json())
            .then((data: Response<OnlineController[]>) => setOnline(data.data));
        setLoading(false);
    }, [setLoading, setOnline]);

    return (
        <>
            <div className="bg-gray-300 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
                <div className="pt-2 m-5">
                    <div className="py-4 text-md">
                        {loading ? <Spinner /> :
                            <div>
                                {
                                    online.map((controller, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between">
                                                <div className="flex">
                                                    <div className="flex flex-col ml-2">
                                                        <div className="font-semibold text-md">{controller.name}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="font-semibold text-md">{controller.duration}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
                <div className="pt-2 m-5">
                    <div className="py-4 text-lg">
                        Events
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
                <div className="pt-2 m-5">
                    <div className="py-4 text-lg">
                        Links
                    </div>
                </div>
            </div>
        </>
    );
};