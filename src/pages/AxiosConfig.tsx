import React, {useEffect, useState} from 'react';

import TodoItem from "../components/TodoItem";
import BaseSpinner from "../components/base/BaseSpinner/BaseSpinner";
import config from "../core/config";
import {toast} from "../components/base/BaseToasts/BaseToasts";
import {Todo} from "../core/types";

const AxiosConfig = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await config.$http.todos({
                params: {
                    _limit: 10
                }
            });
            setTodos(response.data);
        } catch (e: any) {
            console.dir(e)
            toast.error(e.response.message || "Неизвестная ошибка");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    if(loading) {
        return (
            <>
                <div className={"flex justify-center my-8"}>
                    <BaseSpinner />
                </div>
            </>
        );
    }

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

export default AxiosConfig;
