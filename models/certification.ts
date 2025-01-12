export enum CertificationLevel {
    UNRESTRICTED = 0,
    TIER_TWO = 1,
    CENTER = 2,
}


export type Certification = {
    id: number;
    name: string;
    solo: boolean;
    level: CertificationLevel;
};