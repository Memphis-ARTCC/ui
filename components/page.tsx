"use client";

import { useContext } from "react";
import { Container } from "./container";
import { AuthContext } from "@/app/providers";
import { PlusIcon } from "@heroicons/react/16/solid";

type PageProps = {
    children: React.ReactNode;
    title: string;
    create?: boolean;
    authCheck?: string[];
};

const Page = ({ children, title, create, authCheck }: PageProps) => {

    const auth = useContext(AuthContext);

    const canCreate = () => {
        if (!Array.isArray(auth?.user?.roles)) {
            return false;
        }
        if (auth && auth.user) {
            return auth.user.roles.some(role => authCheck?.includes(role));
        }
        return false;
    };

    return (
        <Container>
            <div className="bg-gray-400 rounded-md shadow-sm dark:text-white w-100 dark:bg-gray-700">
                <div className="pt-2 m-5">
                    <h2 className="pb-4 mt-3 text-2xl font-bold text-center border-b-2">
                        {title}
                        {create && canCreate() ? (
                            <div className="flex justify-center">
                                <button>
                                    <PlusIcon className="text-lg" />
                                </button>
                            </div>
                        ) : <></>}
                    </h2>
                    <div className="py-4 text-lg">
                        {children}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Page;