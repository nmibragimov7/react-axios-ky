import React, {useEffect, useState} from 'react';

import TodoItem from "../components/TodoItem";
import BaseSpinner from "../components/base/BaseSpinner/BaseSpinner";
import config from "../core/config";
import {toast} from "../components/base/BaseToasts/BaseToasts";
import {Todo} from "../core/types";

const AxiosModify = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = () => {
        config.$axios.todos({
            query: {
                _limit: 10
            },
            onStart() {
                setLoading(true);
            },
            onSuccess(response: any) {
                setTodos(response.data);
            },
            onError(e: any) {
                console.dir(e)
                toast.error(e.message || "Неизвестная ошибка");
            },
            onFinally() {
                setLoading(false);
            }
        });
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

export default AxiosModify;
