import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

import {ResponseWrapper, StatusCode} from "../types";
import {injectToken} from "../helpers/injectToken";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

class Http {
    private baseUrl: string;
    private instance: AxiosInstance | null = null;
    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp();
    }

    constructor(baseUrl: string = "/api/") {
        this.baseUrl = baseUrl;
    }

    initHttp() {
        const http = axios.create({
            baseURL: this.baseUrl,
            headers,
            withCredentials: true,
        });

        http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

        http.interceptors.response.use(
            (response) => response,
            (error) => {
                return Http.handleError(error);
            }
        );

        this.instance = http;
        return http;
    }

    private static async handleError(error: any) {
        const { response } = error;
        const originalRequest = error.config;
        switch (response.status) {
            case StatusCode.InternalServerError: {
                break;
            }
            case StatusCode.Forbidden: {
                break;
            }
            case StatusCode.Unauthorized: {
                if (!originalRequest._isRetry) {
                    originalRequest._isRetry = true;
                    try {
                        originalRequest!.headers = { ...originalRequest!.headers }
                        return this.request(originalRequest);
                    } catch (error: any) {
                        throw new Error(error);
                    }
                }
                break;
            }
            case StatusCode.TooManyRequests: {
                break;
            }
        }

        return Promise.reject(error);
    }

    request<T = any, R = AxiosResponse<ResponseWrapper<T>>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config);
    }

    get<T = any, R = AxiosResponse<ResponseWrapper<T>>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    post<T = any, R = AxiosResponse<ResponseWrapper<T>>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config);
    }

    put<T = any, R = AxiosResponse<ResponseWrapper<T>>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config);
    }

    delete<T = any, R = AxiosResponse<ResponseWrapper<T>>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config);
    }
}

export const _http = new Http();
