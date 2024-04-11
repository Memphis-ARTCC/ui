
export type Response<T> = {
    statusCode: number;
    message: string;
    data: T;
}