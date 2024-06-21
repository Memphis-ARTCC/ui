"use client";

import { OnlineController } from "@/models/onlineController";
import { useEffect, useState } from "react";
import { Response } from "@/models/response";
import { Table } from "react-bootstrap";
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
        <div className="bg-gray-700 rounded-md">
            <div className="text-center text-white py-6 text-lg">Online Controllers</div>
            <div className="px-6 pb-6">
                <Table borderless className="bg-gray-700">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3}>
                                    <Spinner />
                                </td>
                            </tr>
                        ) : online.map((controller, index) => (
                            <tr key={index}>
                                <td>{controller.name}</td>
                                <td>{controller.callsign}</td>
                                <td>{controller.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};