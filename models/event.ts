import { EventPosition } from "./eventPosition";
import { Upload } from "./upload";

export type Event  = {
    id: number;
    name: string;
    description: string;
    host: string;
    banner: Upload;
    start: Date;
    end: Date;
    positions: EventPosition[];
};