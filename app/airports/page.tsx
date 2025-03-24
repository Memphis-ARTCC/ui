"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Airport } from "@/models/airport";
import { Response } from "@/models/response";
import { CAN_AIRPORTS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Settings, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { AuthContext } from "../Providers";

const createFormSchema = z.object({
    name: z.string().min(1),
    icao: z.string().length(4),
});

const updateFormSchema = z.object({
    name: z.string().min(1),
    icao: z.string().length(4),
});

export default function Airports() {

    const authContext = useContext(AuthContext);

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const [canAirports, setCanAirports] = useState(false);

    const [airports, setAirports] = useState([] as Airport[]);
    const [selectedAirport, setSelectedAirport] = useState({} as Airport);
    const [loading, setLoading] = useState(true);

    const createForm = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: "",
            icao: "",
        },
    });

    const updateForm = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            name: "",
            icao: "",
        },
    });

    async function onCreateSubmit(values: z.infer<typeof createFormSchema>) {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/airports`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(values),
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                toast.error(`Error creating airport:\n${error.message}`);
                setLoading(false);
                return;
            }
            const data = await response.json() as unknown as Response<Airport>;
            setAirports([...airports, data.data]);
            setCreateOpen(false);
            createForm.reset();
            toast.success("Airport created successfully");
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error(error);
            setLoading(false);
            return;
        });
    }

    async function onUpdateSubmit(values: z.infer<typeof updateFormSchema>) {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/airports/${selectedAirport.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(values),
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                toast.error(`Error updating airport:\n${error.message}`);
                setLoading(false);
                return;
            }
            const data = await response.json() as unknown as Response<Airport>;
            setAirports(airports.map((airport) => airport.id === data.data.id ? data.data : airport));
            setUpdateOpen(false);
            updateForm.reset();
            toast.success("Airport updated successfully");
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error(error);
            setLoading(false);
            return;
        });
    }

    async function deleteAirport(id: number) {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/airports/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                toast.error(`Error deleting airport:\n${error.message}`);
                setLoading(false);
                return;
            }
            setAirports(airports.filter((airport) => airport.id !== id));
            toast.success("Airport deleted successfully");
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error(error);
            setLoading(false);
            return;
        });
    }

    useEffect(() => {
        document.title = "Airports | Memphis ARTCC";
        const fetchAirports = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/airports`);
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                throw new Error(`Error fetching airports:\n${error.message}`);
            }
            return await response.json() as Response<Airport[]>;
        };

        fetchAirports()
            .then((response) => {
                setAirports(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
                setLoading(false);
            });
        setCanAirports(authContext?.hasRoles(CAN_AIRPORTS) ?? false);
    }, [authContext]);

    return (
        <div className="w-100 text-center text-white">
            <div className="flex flex-row justify-center">
                <div className="mb-4 text-center text-3xl">
                    Airports
                </div>
                {canAirports ? (
                    <div className="ms-2 mt-2 text-lg text-white">
                        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                            <DialogTrigger>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <PlusIcon className="me-2" size={24} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>New Airport</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-700">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-normal text-white">New Airport</DialogTitle>
                                    <Form {...createForm}>
                                        <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-8">
                                            <Row>
                                                <Col lg="8">
                                                    <FormField
                                                        control={createForm.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-lg text-white">Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </Col>
                                                <Col>
                                                    <FormField
                                                        control={createForm.control}
                                                        name="icao"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-lg text-white">ICAO</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="ICAO" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                            {!loading ? (
                                                <Button type="submit" className="bg-success text-right">Submit</Button>
                                            ) : (
                                                <Button type="submit" className="bg-success text-right" disabled>
                                                    <Spinner />
                                                </Button>
                                            )}
                                        </form>
                                    </Form>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : <></>}
            </div>

            <Table className="rounded-2xl bg-gray-700 p-3 shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">ICAO</TableHead>
                        <TableHead className="text-white">Winds</TableHead>
                        <TableHead className="text-white">Altimeter</TableHead>
                        <TableHead className="text-white">Temperature</TableHead>
                        {canAirports ? (
                            <TableHead className="text-white">Actions</TableHead>
                        ) : (
                            <></>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {airports.length > 0 ? (
                        <>
                            {airports.map((airport) => (
                                <TableRow key={airport.id} className="text-left text-lg">
                                    <TableCell>
                                        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                                            <DialogTrigger>
                                                {airport.name}
                                            </DialogTrigger>
                                            <DialogContent className="bg-gray-700">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-normal text-white">{airport.name}</DialogTitle>
                                                    <div className="text-lg text-white">
                                                        <div>{airport.metarRaw}</div>
                                                        <Table>
                                                            <TableBody className="text-lg">
                                                                <TableRow>
                                                                    <TableCell>Wind</TableCell>
                                                                    <TableCell>{airport.wind}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Altimeter</TableCell>
                                                                    <TableCell>{airport.altimeter} inHg</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Temperature</TableCell>
                                                                    <TableCell>{airport.temperature} °C</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Flight Rules</TableCell>
                                                                    <TableCell>{airport.flightRules}</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Visibility</TableCell>
                                                                    <TableCell>{airport.visibility}</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>{airport.icao}</TableCell>
                                    <TableCell>{airport.wind}</TableCell>
                                    <TableCell>{airport.altimeter} inHg</TableCell>
                                    <TableCell>{airport.temperature} °C</TableCell>
                                    {canAirports ? (
                                        <TableCell>
                                            <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                                                <DialogTrigger>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild onClick={() => {
                                                                setSelectedAirport(airport);
                                                                updateForm.reset({
                                                                    name: airport.name,
                                                                    icao: airport.icao,
                                                                });
                                                            }}>
                                                                <Settings className="me-2" size={24} />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Airport</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </DialogTrigger>
                                                <DialogContent className="bg-gray-700">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-normal text-white">Update Airport</DialogTitle>
                                                        <Form {...updateForm}>
                                                            <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-8">
                                                                <Row>
                                                                    <Col lg="8">
                                                                        <FormField
                                                                            control={updateForm.control}
                                                                            name="name"
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel className="text-lg text-white">Name</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input {...field} />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <FormField
                                                                            control={updateForm.control}
                                                                            name="icao"
                                                                            render={({ field }) => (
                                                                                <FormItem>
                                                                                    <FormLabel className="text-lg text-white">ICAO</FormLabel>
                                                                                    <FormControl>
                                                                                        <Input {...field} />
                                                                                    </FormControl>
                                                                                    <FormMessage />
                                                                                </FormItem>
                                                                            )}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                {!loading ? (
                                                                    <Button type="submit" className="bg-success text-right">Submit</Button>
                                                                ) : (
                                                                    <Button type="submit" className="bg-success text-right" disabled>
                                                                        <Spinner />
                                                                    </Button>
                                                                )}
                                                            </form>
                                                        </Form>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                                <DialogTrigger>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild onClick={() => setSelectedAirport(airport)}>
                                                                <Trash2 size={24} />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Delete Airport</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </DialogTrigger>
                                                <DialogContent className="bg-gray-700">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-normal text-white">Are you sure you want to delete this airport?</DialogTitle>
                                                        <DialogDescription className="text-md text-white">
                                                            <span className="text-lg">{selectedAirport.name}</span>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button className="bg-success" onClick={() => {
                                                                deleteAirport(airport.id);
                                                            }}>
                                                                Confirm
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    ) : (
                                        <></>
                                    )}
                                </TableRow>
                            ))}
                        </>
                    ) : (
                        <>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={canAirports ? 6 : 7}>
                                        <Spinner />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    {<TableCell colSpan={canAirports ? 6 : 7} className="text-lg">
                                        No airports found.
                                    </TableCell>}
                                </TableRow>
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};