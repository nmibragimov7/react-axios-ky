import {ModifyAxios, Todo} from "../types";
import {http} from "./http";
import {_ky_} from "./ky";

export const api = (axios: ModifyAxios) => {
    return {
        todos: axios.get('todoss'),
        todoById: (id: number) => axios.get(`todos/${id}`)
    }
}

export const _http = {
    todos: (config: any): any => http.get<Todo[]>('todos', config),
    todoById: (id: number) => http.get<Todo>(`todos/${id}`)
}

export const _ky = {
    todos: (config: any): any => _ky_.get('todos', config),
    todoById: (id: number) => _ky_.get(`todos/${id}`)
}
