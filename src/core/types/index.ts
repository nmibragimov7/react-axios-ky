export interface IStringObject {
    [key: string]: string
}

export type IRequestWrapper = (
    params?: Partial<{
        headers: IStringObject
        query: {
            [key: string]: any
        }
        body: any
        onStart: () => void
        onSuccess(res: any): void
        onError(res: any): void
        onFinally(): void
    }>
) => Promise<any>

export type AxiosMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

type IRequest = (path: string) => IRequestWrapper;

export type ModifyAxios = Record<AxiosMethods, IRequest>;

export const enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

export const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

export interface ResponseWrapper<T = any> {
    data: T
}

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
