import ky, {ResponsePromise} from "ky";
import {KyInstance} from "ky/distribution/types/ky";
import {StatusCode} from "../types";

class Ky {
    private baseUrl: string;
    private instance: KyInstance;

    constructor(baseUrl: string = "https://jsonplaceholder.typicode.com/") {
        this.baseUrl = baseUrl;
        this.instance = ky.create({
            prefixUrl: this.baseUrl,
            headers: {
                "content-Type": "application/json; charset=utf-8"
            },
            hooks: {
                beforeRequest: [
                    request => {
                        const token = localStorage.getItem("access-token");
                        if (token) {
                            request.headers.set("Authorization", `Bearer ${token}`);
                        }
                    }
                ],
                beforeError: [
                    async (error) => {
                        return await this.handleError(error);
                    }
                ]
            }
        });
    }

    private async handleError(error: any) {
        const { response } = error;
        const originalRequest = error.options;
        const url = error.request;

        switch (response.status) {
            case StatusCode.InternalServerError: {
                break;
            }
            case StatusCode.Forbidden: {
                break;
            }
            case StatusCode.Unauthorized: {
                try {
                    // refresh()
                    this.request(originalRequest, url);
                } catch (error: any) {
                    throw new Error(error);
                }
                break;
            }
            case StatusCode.TooManyRequests: {
                break;
            }
        }

        return Promise.reject(error);
    }

    request(config: any, url: string): ResponsePromise {
        return this.instance(url, {
            retry: {
                limit: 1,
                methods: [config.method]
            }
        });
    }

    get(url: string, config?: any): ResponsePromise {
        return this.instance.get(url, {
            searchParams: {
                ...config
            }
        })
    }

    post<T extends BodyInit | null | undefined = any>(url: string, body?: T, config?: any): ResponsePromise {
        return this.instance.post(url, {
            body,
            searchParams: {
                ...config
            }
        })
    }

    put<T extends BodyInit | null | undefined = any>(url: string, body?: T, config?: any): ResponsePromise {
        return this.instance.put(url, {
            body,
            searchParams: {
                ...config
            }
        })
    }

    delete(url: string, config?: any): ResponsePromise {
        return this.instance.delete(url, {
            searchParams: {
                ...config
            }
        })
    }
}

export const _ky_ = new Ky();
