import axios from "axios";

import {headers, StatusCode} from "../types";
import {modifyAxios} from "./modifyAxios";
import {api} from "./api";
import {injectToken} from "../helpers/injectToken";

const http = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    headers,
    withCredentials: true,
});

const handleError = (error: any) => {
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
                    // refresh()
                    originalRequest!.headers = { ...originalRequest!.headers };
                    return http.request(originalRequest);
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

http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
http.interceptors.response.use(
    (response) => response,
    (error) => {
        return handleError(error);
    })
const back = modifyAxios(http);
export const _axios = api(back);
