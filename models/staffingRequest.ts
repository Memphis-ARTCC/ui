export type StaffingRequest = {
    id: number;
    cid: number;
    fullName: string;
    email: string;
    organization: string;
    estimatedPilots: number;
    start: Date;
    duration: string;
};