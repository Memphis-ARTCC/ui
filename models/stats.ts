import { Rating, UserStatus } from "./rosterUser";

export type Stats = {
    cid: number;
    firstName: string;
    lastName: string;
    initials: string;
    status: UserStatus;
    rating: Rating;
    month: number;
    year: number;
    deliveryHours: number;
    groundHours: number;
    towerHours: number;
    traconHours: number;
    centerHours: number;
    totalHours: number;
}