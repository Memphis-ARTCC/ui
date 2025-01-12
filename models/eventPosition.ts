import { Rating } from "./rating";

export type EventPosition = {
    id: number;
    name: string;
    minimumRating: Rating;
    taken: boolean;
};