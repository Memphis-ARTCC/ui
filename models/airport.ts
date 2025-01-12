
export type Airport = {
    id: number;
    name: string;
    icao: string;
    arrivals: number;
    departures: number;
    wind?: string;
    altimeter?: string;
    temperature?: string;
    flightRules?: string;
    visibility?: string;
    metarRaw?: string;
};