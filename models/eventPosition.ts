import { Rating } from "./rosterUser";

export type EventPosition = {
    id: number;
    name: string;
    minimumRating: Rating;
    taken: boolean;
};