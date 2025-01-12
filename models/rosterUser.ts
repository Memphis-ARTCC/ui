import { Certification } from "./certification";
import { Role } from "./role";

export enum Rating {
    INA = -1,
    SUS = 0,
    OBS = 1,
    S1 = 2,
    S2 = 3,
    S3 = 4,
    C1 = 5,
    C2 = 6,
    C3 = 7,
    I1 = 8,
    I2 = 9,
    I3 = 10,
    SUP = 11,
    ADM = 12,
};

export enum UserStatus {
    REMOVED = -1,
    INACTIVE = 0,
    ACTIVE = 1,
    LOA = 2,
    EXEMPT = 3,
};

export type RosterUser = {
    cid: number;
    name: string;
    initials: string;
    rating: Rating;
    status: UserStatus;
    visitor: boolean;
    visitorFrom?: string;
    ground?: Certification;
    tower?: Certification;
    radar?: Certification;
    center?: Certification;
    roles?: Role[]
}