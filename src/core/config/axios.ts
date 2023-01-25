import axios from "axios";

import {headers} from "../types";
import {modifyAxios} from "../config/modifyAxios";
import {api} from "../config/api";
import {injectToken} from "../helpers/injectToken";

const http = axios.create({
    baseURL: "/api/",
    headers,
    withCredentials: true,
});
http.interceptors.request.use(injectToken, (error) => Promise.reject(error));
const back = modifyAxios(http);
export const _axios = api(back);
