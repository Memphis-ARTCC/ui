"use client";

import AuthRoute from "@/components/AuthRoute";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Response } from "@/models/response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Row, Col, FormLabel, FormControl, Button, Spinner } from "react-bootstrap";
import { Form, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { AuthContext } from "../Providers";


const formSchema = z.object({
    cid: z.number().positive(),
    fullName: z.string().nonempty(),
    email: z.string().email(),
    organization: z.string().nonempty(),
    estimatedPilots: z.number().positive(),
    start: z.date(),
    duration: z.string().nonempty(),
});

export default function StaffingRequest() {

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cid: authContext?.user?.cid ?? 0,
            fullName: authContext?.user?.fullName ?? "",
            email: authContext?.user?.email ?? "",
            organization: "",
            estimatedPilots: 0,
            start: new Date(),
            duration: "1:00",
        },
    });

    useEffect(() => {
        document.title = "Staffing Request | Memphis ARTCC";
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staffingrequests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(values),
        }).then(async (response) => {
            if (!response.ok) {
                const error = await response.json() as Response<string>;
                toast.error(`Error creating staffing request:\n${error.message}`);
                setLoading(false);
                return;
            }
            toast.success("Staffing request created successfully");
            setLoading(false);
            router.push("/");
            return;
        }).catch((error) => {
            console.log(error);
            toast.error(error);
            setLoading(false);
            return;
        });
    }

    return (
        <AuthRoute>
            <div className="w-100 text-center text-white">
                <div className="flex flex-row justify-center">
                    <div className="mb-4 text-center text-3xl">
                    Staffing Request
                    </div>
                </div>
                <div className="rounded-2xl bg-gray-700 p-3 shadow-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Row>
                                <Col lg="8">
                                    <FormField
                                        control={form.control}
                                        name="cid"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">CID</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Name</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Email</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Organization</FormLabel>
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
                                        control={form.control}
                                        name="estimatedPilots"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Organization</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="start"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Start Date & Time</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} value={field.value.toISOString().split("T")[0]} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Duration</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
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
                </div>
            </div>
        </AuthRoute>
    );
}