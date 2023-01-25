import axios, {AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig} from "axios";
import {StatusCode} from "../types";
import {injectToken} from "./index";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
};

class Http {
    private baseUrl: string;
    private instanse: AxiosInstance;

    constructor(baseUrl: string = "/api/") {
        this.baseUrl = baseUrl;
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

        this.instanse = http;
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
                        // return this.request(originalRequest);
                    } catch (error: any) {

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
}

export const http = new Http();
