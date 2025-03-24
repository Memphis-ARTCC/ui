"use client";
import { Event } from "@/models/event";
import { OnlineController } from "@/models/onlineController";
import { Response } from "@/models/response";
import { useEffect, useState } from "react";

import Spinner from "./Spinner";

const Sideabr = () => {

    const [onlineControllers, setOnlineControllers] = useState([] as OnlineController[]);
    const [events, setEvents] = useState([] as Event[]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOnlineControllers = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/onlinecontrollers`);
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching online controllers:\n${error.message}`);
            }
            return await response.json() as Response<OnlineController[]>;
        };

        const fetchEvents = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching events:\n${error.message}`);
            }
            return await response.json() as Response<Event[]>;
        };

        fetchOnlineControllers()
            .then((response) => {
                console.log(response);
                setOnlineControllers(response.data);
            })
            .catch((error) => {
                console.log(`Error fetching online controllers:\n${error}`);
            });

        fetchEvents()
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.log(`Error fetching events:\n${error}`);
            });

        setLoading(false);
    }, []);

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="mb-8 w-4/5">
                    <div className="mb-4 text-center text-2xl text-white">
                        Online Controllers
                    </div>
                    {!loading ? (
                        <>
                            {onlineControllers.length > 0 ? (
                                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                                    {onlineControllers.map((controller, index) => (
                                        <div key={index} className="mb-2 flex items-center justify-between p-2 text-base text-white">
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                                                    {controller.callsign}
                                                </span>
                                                <span className="text-white">{controller.name}</span>
                                            </div>
                                            <div className="mx-2 h-0.5 flex-1 bg-gray-500"></div>
                                            <span className="text-white">{controller.frequency}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4 rounded-2xl bg-gray-700 p-3 text-center text-lg text-white shadow-md">No controllers online</div>
                            )}
                        </>
                    ) : <Spinner />}
                </div>
            </div>
            <div className="mb-4 text-center text-2xl text-white">
                    Upcoming Events
            </div>
            {!loading ? (
                <>
                    {events.length > 0 ? (
                        <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                            {events.map((event, index) => (
                                <div key={event.id} className={index == events.length - 1 ? "" : "mb-4"}>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl bg-gray-700 p-3 text-center text-lg text-white shadow-md">No upcoming events</div>
                    )}
                </>
            ) : <Spinner />}
        </>
    );
};

export default Sideabr;