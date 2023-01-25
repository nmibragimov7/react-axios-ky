import React from 'react';

import BaseCheckbox from "./base/BaseCheckbox/BaseCheckbox";
import {Todo} from "../core/types";

interface IProps {
    item: Todo;
    className?: string;
}

const TodoItem: React.FC<IProps> = (props) => {
    const {
        item,
        className
    } = props;

    return (
        <div className={className}>
            <BaseCheckbox
                name={`todo-${item.id}`}
                value={item.completed}
                setValue={() => console.log("")}
            >
                {item.title}
            </BaseCheckbox>
        </div>
    );
};

export default TodoItem;
