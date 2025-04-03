import { EventPosition } from "./eventPosition";

export type Event  = {
    id: number;
    title: string;
    description: string;
    host: string;
    bannerUrl?: string;
    start: Date;
    end: Date;
    positions: EventPosition[];
};