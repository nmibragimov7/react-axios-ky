import axios from "axios";

import {headers} from "../types";
import {injectToken} from "../config";
import {modifyAxios} from "../config/modifyAxios";
import {api} from "../config/api";


export const useAxios = (baseUrl: string = "/api/") => {
    const $axios = axios.create({
        baseURL: baseUrl,
        headers,
        withCredentials: true,
    });
    $axios.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    const back = modifyAxios($axios);
    const http = api(back);

    return { http };
}
