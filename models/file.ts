
export enum FileType {
    POLICY,
    SOP,
    LOA,
    REFERENCE,
    MISC,
    CLIENT,
    TRAINING_STAFF,
    STAFF,
    SENIOR_STAFF
}

export type File = {
    id: number;
    title: string;
    description: string;
    version: string;
    fileUrl?: string;
    type: FileType;
    created: Date;
    updated: Date;
};