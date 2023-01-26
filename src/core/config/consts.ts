export const modifyAxios = `
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
`;
export const http = `
    class Http {
        private baseUrl: string;
        private instance: AxiosInstance | null = null;
        private get http(): AxiosInstance {
            return this.instance != null ? this.instance : this.initHttp();
        }
    
        constructor(baseUrl: string = "https://jsonplaceholder.typicode.com/") {
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
                    return this.handleError(error);
                }
            );
    
            this.instance = http;
            return http;
        }
    
        private async handleError(error: any) {
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
    
        request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
            return this.http.request(config);
        }
    
        get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
            return this.http.get<T, R>(url, config);
        }
    
        post<T = any, R = AxiosResponse<T>>(
            url: string,
            data?: T,
            config?: AxiosRequestConfig
        ): Promise<R> {
            return this.http.post<T, R>(url, data, config);
        }
    
        put<T = any, R = AxiosResponse<T>>(
            url: string,
            data?: T,
            config?: AxiosRequestConfig
        ): Promise<R> {
            return this.http.put<T, R>(url, data, config);
        }
    
        delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
            return this.http.delete<T, R>(url, config);
        }
    }
`;
export const ky = `
    class Ky {
        private baseUrl: string;
        private instance: KyInstance;
        private isRetry: boolean = false;
    
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
                                request.headers.set("Authorization", "Bearer " + token);
                            }
                        }
                    ],
                    beforeError: [
                        async (error) => {
                            return await this.handleError(error);
                        }
                    ],
                    afterResponse: [
                        (_, __, response) => {
                            if (response.status === 200) {
                                this.isRetry = false;
                            }
                        }
                    ]
                }
            });
        }
    
        private async handleError(error: any) {
            const { response } = error;
            const options = error.options;
            const url = error.request;
    
            switch (response.status) {
                case StatusCode.InternalServerError: {
                    break;
                }
                case StatusCode.Forbidden: {
                    break;
                }
                case StatusCode.Unauthorized: {
                    if (!this.isRetry) {
                        this.isRetry = true;
                        try {
                            // refresh()
                            this.request(options, url);
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
    
        request(options: any, url: string): ResponsePromise {
    
            return this.instance(url, {
                method: options.method,
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
`;
