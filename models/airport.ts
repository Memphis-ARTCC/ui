export type Airport = {
    id: number;
    name: string;
    icao: string;
    arrivals: number;
    departures: number;
    wind: string | null;
    altimeter: string | null;
    temperature: string | null;
    metarRaw: string | null;
    created: Date;
    updated: Date;
}