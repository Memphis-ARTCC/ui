"use client";

import { Fragment, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { AuthContext, HeaderContext } from "@/app/providers";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export const Navigation = () => {
    const auth = useContext(AuthContext);
    const image = useContext(HeaderContext);
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        if (!auth?.user) {
            const token = localStorage.getItem("accessToken");
            if (token) {
                auth?.setUser(jwtDecode(token));
            }
        }
    }, [auth]);

    return (
        <>
            <div className={`h-[190px] w-full ${image ?? "header-image-1"}`}></div>
            <div className="py-6 mb-8 bg-gray-400 dark:bg-sky-900">
                <div className="mx-[12%]">
                    <div className="flex items-center justify-between w-full h-10 p-8 dark:text-white">
                        <div className="justify-start">
                            <Link href="/">
                                <Image src={`${process.env.SPACES_URL}/images/zme_logo.png`} alt="Memphis ARTCC" width={100} height={100} priority />
                            </Link>
                        </div>
                        <ul className="flex justify-center">
                            <li className="p-4">
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className={"text-lg font-bold flex justify-between"}>
                                        Pilots<ChevronDownIcon className="w-8 h-8" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md shadow-lg bg-slate-300 dark:bg-slate-600 min-w-48 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    <Link href="/pilots/airports" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Airports
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link href="/pilots/staffing" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Staffing Request
                                                    </Link>
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </li>
                            <li className="p-4">
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className={"text-lg font-bold flex justify-between"}>
                                        Controllers<ChevronDownIcon className="w-8 h-8" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md shadow-lg bg-slate-300 dark:bg-slate-600 min-w-48 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item>
                                                    <Link href="/controllers/staff" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Staff
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link href="/controllers/roster" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Roster
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link href="/controllers/statistics" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Statistics
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link href="/controllers/files" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                        Files
                                                    </Link>
                                                </Menu.Item>
                                                {auth?.user != null ? (
                                                    <Menu.Item>
                                                        <Link href="/controllers/training" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Training Schedule
                                                        </Link>
                                                    </Menu.Item>
                                                ) : <></>}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </li>
                            <li className="p-4">
                                <Link className="text-xl font-bold" href="/feedback">
                                    Feedback
                                </Link>
                            </li>
                            <li className="p-4">
                                <Link className="text-xl font-bold" href="/events">
                                    Events
                                </Link>
                            </li>
                            {auth?.user && auth.isTrainingStaff() ? (
                                <li className="p-4">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className={"text-lg font-bold flex justify-between"}>
                                            Training Management<ChevronDownIcon className="w-8 h-8" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md shadow-lg bg-slate-300 dark:bg-slate-600 min-w-48 focus:outline-none">
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        <Link href="/training/tickets" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Training Tickets
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/training/schedule" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Training Schedule
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/training/solo" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Solo Certs
                                                        </Link>
                                                    </Menu.Item>
                                                    {auth?.user != null && auth.isSeniorTrainingStaff() ? (
                                                        <Menu.Item>
                                                            <Link href="/training/ots" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                OTS Management
                                                            </Link>
                                                        </Menu.Item>
                                                    ) : <></>}
                                                    {auth?.user != null && auth.isSeniorStaff() ? (
                                                        <>
                                                            <Menu.Item>
                                                                <Link href="/training/milestones" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Training Milestones
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link href="/training/activity" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Training Activity
                                                                </Link>
                                                            </Menu.Item>
                                                        </>
                                                    ) : <></>}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </li>
                            ) : <></>}
                            {auth?.user && auth.isStaff() ? (
                                <li className="p-4">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className={"text-lg font-bold flex justify-between"}>
                                            ARTCC Management<ChevronDownIcon className="w-8 h-8" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md shadow-lg bg-slate-300 dark:bg-slate-600 min-w-48 focus:outline-none">
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        <Link href="/management" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Dashboard
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/management/activity" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Activity
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/management/staffing" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Staffing Requests
                                                        </Link>
                                                    </Menu.Item>
                                                    {auth?.user != null && auth.isSeniorStaff() ? (
                                                        <>
                                                            <Menu.Item>
                                                                <Link href="/management/feedback" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Feedback
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link href="/management/settings" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Settings
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link href="/management/emails" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Email Logs
                                                                </Link>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <Link href="/management/logs" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                    Website Logs
                                                                </Link>
                                                            </Menu.Item>
                                                        </>
                                                    ) : <></>}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </li>
                            ) : <></>}
                        </ul>
                        <div className="justify-end">
                            <div className="items-center justify-center">
                                {auth?.user != null ? (
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className={"text-lg font-bold flex justify-between"}>
                                            {auth.user?.fullName} <ChevronDownIcon className="w-8 h-8" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute left-0 mt-2 origin-top-left divide-y divide-gray-100 rounded-md shadow-lg bg-slate-300 dark:bg-slate-600 min-w-48 focus:outline-none">
                                                <div className="px-1 py-1 ">
                                                    <Menu.Item>
                                                        <Link href="/profile" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Profile
                                                        </Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {theme === "dark" ? (
                                                            <a href="#" onClick={() => setTheme("light")} className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                Toggle Light Mode
                                                            </a>
                                                        ) : (
                                                            <a href="#" onClick={() => setTheme("dark")} className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                                Toggle Dark Mode
                                                            </a>

                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link href="/auth/logout" className="flex justify-between w-full px-4 py-2 transition-all rounded-md font-lg dark:hover:bg-slate-500 hover:bg-slate-200">
                                                            Logout
                                                        </Link>
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <Link className="p-4 text-lg font-bold" href="/auth/login">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};