export type Token = {
    exp: number;
    cid: number;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    rating: number;
    ratingLong: number;
    region: number;
    division: number;
    isMember: boolean;
    roles: string[];
    roleNames: string[] | string;
}