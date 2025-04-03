"use client";

import Spinner from "@/components/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, FileType } from "@/models/file";
import { Response } from "@/models/response";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../Providers";

type FileEntryProps = {
    files: File[];
};

const FileEntry = ({ files }: FileEntryProps) => {
    return (
        <div className="mx-10 my-4 p-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell className="text-lg font-medium">Title</TableCell>
                        <TableCell className="text-lg font-medium">Description</TableCell>
                        <TableCell className="text-lg font-medium">Version</TableCell>
                        <TableCell className="text-lg font-medium">File</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {files.length > 0 ? (
                        <>
                            {files.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-lg">{file.title}</TableCell>
                                    <TableCell className="text-lg">{file.description}</TableCell>
                                    <TableCell className="text-lg">{file.version}</TableCell>
                                    <TableCell className="text-lg">
                                        <a className="mt-4 w-auto rounded-md bg-blue-700 p-2 text-center shadow-md transition-all hover:bg-blue-600" href={file.fileUrl} target="_blank">
                                        Download
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    ): (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-lg">No files found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default function Files() {

    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [files, setFiles] = useState<File[]>([] as File[]);

    useEffect(() => {

        document.title = "Files | Memphis ARTCC";

        const fetchFiles = async () => {
            const headers = new Map<string, string>();
            if (authContext?.isLoggedIn) {
                headers.set("Authorization", `Bearer ${localStorage.getItem("accessToken")}`);
            }
            headers.set("Content-Type", "application/json");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`, {
                headers: Object.fromEntries(headers),
            });
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching roster:\n${error.message}`);
            }
            return await response.json() as Response<File[]>;
        };

        fetchFiles()
            .then((response) => {
                setFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
                setLoading(false);
            });

    }, [authContext]);

    return (
        <div className="w-100 text-center text-white">
            <div className="flex flex-row justify-center">
                <div className="mb-4 text-center text-3xl">
                    Files
                </div>
            </div>
            <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                {!loading ? (
                    <div>
                        <Tabs defaultValue="Policies">
                            <TabsList>
                                <TabsTrigger className="text-lg text-white" value="Policies">Policies</TabsTrigger>
                                <TabsTrigger className="text-lg text-white" value="SOPs">SOP&apos;s</TabsTrigger>
                                <TabsTrigger className="text-lg text-white" value="LOAs">LOA&apos;s</TabsTrigger>
                                <TabsTrigger className="text-lg text-white" value="References">References</TabsTrigger>
                                <TabsTrigger className="text-lg text-white" value="Miscellaneous">Miscellaneous</TabsTrigger>
                                <TabsTrigger className="text-lg text-white" value="Clients">Clients</TabsTrigger>
                                {authContext?.isTrainingStaff() ? (
                                    <TabsTrigger className="text-lg text-white" value="Training Staff">Training Staff</TabsTrigger>
                                ) : <></>}
                                {authContext?.isStaff() ? (
                                    <TabsTrigger className="text-lg text-white" value="Staff">Staff</TabsTrigger>
                                ) : <></>}
                                {authContext?.isSeniorStaff() ? (
                                    <TabsTrigger className="text-lg text-white" value="Senior Staff">Senior Staff</TabsTrigger>
                                ) : <></>}
                            </TabsList>
                            <TabsContent value="Policies">
                                <FileEntry files={files.filter((file) => file.type === FileType.POLICY)} />
                            </TabsContent>
                            <TabsContent value="SOPs">
                                <FileEntry files={files.filter((file) => file.type === FileType.SOP)} />
                            </TabsContent>
                            <TabsContent value="LOAs">
                                <FileEntry files={files.filter((file) => file.type === FileType.LOA)} />
                            </TabsContent>
                            <TabsContent value="References">
                                <FileEntry files={files.filter((file) => file.type === FileType.REFERENCE)} />
                            </TabsContent>
                            <TabsContent value="Miscellaneous">
                                <FileEntry files={files.filter((file) => file.type === FileType.MISC)} />
                            </TabsContent>
                            <TabsContent value="Clients">
                                <FileEntry files={files.filter((file) => file.type === FileType.CLIENT)} />
                            </TabsContent>
                            {authContext?.isTrainingStaff() ? (
                                <TabsContent value="Training Staff">
                                    <FileEntry files={files.filter((file) => file.type === FileType.TRAINING_STAFF)} />
                                </TabsContent>
                            ) : <></>}
                            {authContext?.isStaff() ? (
                                <TabsContent value="Staff">
                                    <FileEntry files={files.filter((file) => file.type === FileType.STAFF)} />
                                </TabsContent>
                            ) : <></>}
                            {authContext?.isSeniorStaff() ? (
                                <TabsContent value="Senior Staff">
                                    <FileEntry files={files.filter((file) => file.type === FileType.SENIOR_STAFF)} />
                                </TabsContent>
                            ) : <></>}
                        </Tabs>
                    </div>
                ) : <Spinner />}
            </div>
        </div>
    );
}