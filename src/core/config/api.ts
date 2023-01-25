import {ModifyAxios} from "../types";
import {_http} from "./http";

export const api = (axios: ModifyAxios) => {
    return {
        todos: axios.get('todos'),
        todoById: (id: number) => axios.get(`todos/${id}`)
    }
}

export const httpApi = {
    todos: (): any => _http.get('todos'),
    todoById: (id: number) => _http.get(`todos/${id}`)
}
