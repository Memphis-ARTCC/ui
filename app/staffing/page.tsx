"use client";

import AuthRoute from "@/components/AuthRoute";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Response } from "@/models/response";
import { StaffingRequest as StaffingRequestType } from "@/models/staffingRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { AuthContext } from "../Providers";


const formSchema = z.object({
    email: z.string().email(),
    organization: z.string().nonempty(),
    estimatedPilots: z.number().positive(),
    start: z.date().refine((date) => date > new Date(), {
        message: "Start date must be in the future",
    }),
    duration: z.string().nonempty(),
});

const generateDurationOptions = () => {
    const options = [];
    for (let hours = 1; hours <= 12; hours++) {
        for (const minutes of [0, 30]) {
            const formattedHours = String(hours).padStart(2, "0");
            const formattedMinutes = String(minutes).padStart(2, "0");
            options.push(`${formattedHours}:${formattedMinutes}`);
        }
    }
    return options;
};

export default function StaffingRequest() {

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            organization: "",
            estimatedPilots: 0,
            start: new Date(),
            duration: "1:00",
        },
    });

    useEffect(() => {
        document.title = "Staffing Request | Memphis ARTCC";
        setLoading(false);
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const requestBody: StaffingRequestType = {
            cid: authContext?.user?.cid as number,
            fullName: authContext?.user?.fullName as string,
            email: values.email,
            organization: values.organization,
            estimatedPilots: values.estimatedPilots,
            start: values.start,
            duration: values.duration,
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staffingrequests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(requestBody),
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
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Email</FormLabel>
                                                <FormControl>
                                                    <Input className="text-black" placeholder="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <FormField
                                        control={form.control}
                                        name="organization"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Organization</FormLabel>
                                                <FormControl>
                                                    <Input className="text-black" placeholder="Organization" {...field} />
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
                                        name="estimatedPilots"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg text-white">Estimated Pilots</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="text-black"
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                                    />
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
                                                <FormLabel className="text-lg text-white">Start</FormLabel>
                                                <br />
                                                <FormControl>
                                                    <DatePicker
                                                        selected={field.value}
                                                        onChange={(date) => form.setValue("start", date as Date)}
                                                        showTimeSelect
                                                        dateFormat="Pp"
                                                        className="w-full rounded-md border p-2 text-black"
                                                    />
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
                                                <FormLabel  className="text-lg text-white">Duration</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="!text-black">
                                                            <SelectValue placeholder="Select duration" />
                                                        </SelectTrigger>
                                                        <SelectContent className="!text-black">
                                                            {generateDurationOptions().map((duration) => (
                                                                <SelectItem key={duration} value={duration}>
                                                                    {duration}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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