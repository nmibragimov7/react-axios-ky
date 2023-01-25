import React, {memo} from 'react';

import styles from './BaseCheckbox.module.scss';

interface IProps {
    name: string;
    className?: string;
    children: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

const BaseCheckbox: React.FC<IProps> = memo((props) => {
    const {
        name,
        className,
        children,
        value,
        setValue
    } = props;
    const classesArr = ["min-w-[1.5rem] h-6 rounded-md border border-solid border-gray-100 mr-2.5 relative"];
    if(value) {
        classesArr.push("after:absolute after:content-[''] after:rounded after:w-4 after:h-4 after:top-1/2 after:left-1/2 after:translate-x-[-50%] after:translate-y-[-50%] after:bg-birch");
    }
    const classes = classesArr.join(" ");

    return (
        <div className={[styles.BaseCheckbox, className].join(" ")}>
            <label
                htmlFor={name}
                className={"flex items-center cursor-pointer"}
            >
                <input
                    id={name}
                    type="checkbox"
                    className={"opacity-0 w-0 h-0"}
                    checked={value}
                    onChange={() => setValue(!value)}
                />
                <span className={classes}></span>
                <span>{children}</span>
            </label>
        </div>
    );
});

export default BaseCheckbox;
