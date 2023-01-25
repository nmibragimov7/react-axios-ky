import {ModifyAxios} from "../types";

export const api = (axios: ModifyAxios) => {
    return {
        todos: axios.get('todos/'),
        todoById: (id: number) => axios.get(`todos/${id}/`)
    }
}
