import {AxiosInstance} from "axios";

import {AxiosMethods, IRequestWrapper, ModifyAxios} from "../types";

export const modifyAxios = (axios: AxiosInstance) => {
    const methods: AxiosMethods[] = ["get", "post", "patch", "put", "delete"];

    const requestWrapper = (
        method: AxiosMethods,
        initialPath: string
    ): IRequestWrapper => {
        return (params = {}) => {
            const localParams = {
                headers: {},
                query: {},
                body: {},
                onStart: () => {},
                onSuccess: (response: any) => response,
                onError: (error: any) => error,
                onFinally: () => {},
                ...params,
            };
            const { headers, query, body, onSuccess, onStart, onError, onFinally } = localParams;

            onStart()
            return new Promise((resolve, reject) => {
                if (method === methods[0]) {
                    return axios[method](initialPath, {
                        params: query,
                        headers,
                        })
                        .then((response: any)  => {
                            resolve(onSuccess(response))
                        })
                        .catch((error: any) => {
                            reject(onError(error))
                        })
                        .finally(onFinally);
                } else {
                    return axios[method](initialPath, body, {
                        params: query,
                        headers,
                        })
                        .then((response: any) => {
                            resolve(onSuccess(response))
                        })
                        .catch((error: any) => {
                            reject(onError(error))
                        })
                        .finally(onFinally);
                }
            })
        }
    };

    return methods.reduce<ModifyAxios>((result, method) => {
        result[method] = (path: string) => requestWrapper(method, path);
        return result;
    }, {} as ModifyAxios);
}
