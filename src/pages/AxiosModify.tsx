import React, {useEffect, useState} from 'react';

import TodoItem from "../components/TodoItem";
import config from "../core/config";
import {toast} from "../components/base/BaseToasts/BaseToasts";
import {Todo} from "../core/types";

const AxiosModify = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = async () => {
        try {
            const response = await config.$axios.todos();
            setTodos(response.data);
        } catch (e: any) {
            console.dir(e)
            toast.error(e.response.message || "Неизвестная ошибка");
        }
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <div className={"flex flex-col gap-2 max-w-md mx-auto"}>
                {todos.map((todo: Todo) => (
                    <TodoItem key={todo.id} item={todo}/>
                ))}
            </div>
        </>
    );
};

export default AxiosModify;
