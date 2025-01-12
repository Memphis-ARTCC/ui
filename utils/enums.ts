import { Rating, UserStatus } from "@/models/rosterUser";

export function getRatingString(rating: Rating): string {
    switch (rating) {
    case Rating.INA:
        return "Inactive";
    case Rating.SUS:
        return "Suspended";
    case Rating.OBS:
        return "Observer";
    case Rating.S1:
        return "Student 1";
    case Rating.S2:
        return "Student 2";
    case Rating.S3:
        return "Student 3";
    case Rating.C1:
        return "Controller 1";
    case Rating.C2:
        return "Controller 2";
    case Rating.C3:
        return "Controller 3";
    case Rating.I1:
        return "Instructor 1";
    case Rating.I2:
        return "Instructor 2";
    case Rating.I3:
        return "Instructor 3";
    case Rating.SUP:
        return "Supervisor";
    case Rating.ADM:
        return "Administrator";
    default:
        return "Unknown";
    }
}

export function getShortRatingString(rating: Rating): string {
    switch (rating) {
    case Rating.INA:
        return "INA";
    case Rating.SUS:
        return "SUS";
    case Rating.OBS:
        return "OBS";
    case Rating.S1:
        return "S1";
    case Rating.S2:
        return "S2";
    case Rating.S3:
        return "S3";
    case Rating.C1:
        return "C1";
    case Rating.C2:
        return "C2";
    case Rating.C3:
        return "C3";
    case Rating.I1:
        return "I1";
    case Rating.I2:
        return "I2";
    case Rating.I3:
        return "I3";
    case Rating.SUP:
        return "SUP";
    case Rating.ADM:
        return "ADM";
    default:
        return "UNK";
    }
}

export function getUserStatusString(status: UserStatus): string {
    switch (status) {
    case UserStatus.ACTIVE:
        return "Active";
    case UserStatus.INACTIVE:
        return "Inactive";
    case UserStatus.LOA:
        return "LOA";
    default:
        return "Unknown";
    }
}