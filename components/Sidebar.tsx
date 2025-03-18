"use client";
import { Response } from "@/models/response";
import { OnlineController } from "@/models/onlineController";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Event } from "@/models/event";

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
            return await response.json() as OnlineController[];
        };

        const fetchEvents = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching events:\n${error.message}`);
            }
            return await response.json() as Event[];
        };

        fetchOnlineControllers()
            .then((response) => {
                setOnlineControllers(response);
            })
            .catch((error) => {
                console.log(`Error fetching online controllers:\n${error}`);
            });

        fetchEvents()
            .then((response) => {
                setEvents(response);
            })
            .catch((error) => {
                console.log(`Error fetching events:\n${error}`);
            });

        setLoading(false);
    }, []);

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="w-[80%] mb-8">
                    <div className="text-white text-center text-2xl mb-4">
                        Online Controllers
                    </div>
                    {!loading ? (
                        <>
                            {onlineControllers.length > 0 ? (
                                <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                                    {onlineControllers.map((controller, index) => (
                                        <div key={controller.cid} className={index == onlineControllers.length - 1 ? "" : "mb-4"}>
                                            <div className="flex flex-row justify-between w-full">
                                                <div className="flex flex-col justify-start">
                                                    <div className="bg-sky-800 py-2 px-4 rounded-full text-white">
                                                        {controller.callsign}
                                                    </div>
                                                    <div className="text-white ms-4 mt-2 text-lg">
                                                        {controller.frequency}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-end">
                                                    <div className="text-white align-top h-full mt-2 text-right text-lg">
                                                        {controller.name}
                                                    </div>
                                                    <div className="text-white text-right text-lg">
                                                        {controller.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-white text-center text-lg mt-4 bg-gray-700 rounded-2xl shadow-md p-3">No controllers online</div>
                            )}
                        </>
                    ) : <Spinner />}
                </div>
            </div>
            <div className="text-white text-center text-2xl mb-4">
                    Upcoming Events
            </div>
            {!loading ? (
                <>
                    {events.length > 0 ? (
                        <div className="bg-gray-700 rounded-2xl shadow-md p-3">
                            {events.map((event, index) => (
                                <div key={event.id} className={index == events.length - 1 ? "" : "mb-4"}>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white text-center text-lg mt-4 bg-gray-700 rounded-2xl shadow-md p-3">No upcoming events</div>
                    )}
                </>
            ) : <Spinner />}
        </>
    );
};

export default Sideabr;