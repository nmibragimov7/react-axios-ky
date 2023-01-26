import React, {useState} from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';

import {modifyAxios, http, ky} from "../core/config/consts";

const classes = "font-semibold text-purple-dark hover:text-purple-dark/70 text-xl cursor-pointer mb-2";

const Main = () => {
    const [modify, setModify] = useState<boolean>(false);
    const [config, setConfig] = useState<boolean>(false);
    const [kyConfig, setKyConfig] = useState<boolean>(false);

    return (
        <>
            <div>
                <h1 className={"font-semibold text-3xl text-birch text-center mb-4"}>
                    Настройки <a href="https://axios-http.com/" className={"text-purple"}>Axios</a> и <a href="https://github.com/sindresorhus/ky#readme" className={"text-purple"}>KY</a> c typescript-ом
                </h1>
                <div className={"mb-4"}>
                    <div className={classes} onClick={() => setModify(!modify)}>1. Axios modify</div>
                    {modify &&
                    <div className={"px-4"}>
                        <div>Метод <span className={"font-semibold text-green mb-4"}>modifyAxios</span></div>
                        <Highlight>
                            {modifyAxios}
                        </Highlight>
                    </div>
                    }
                </div>
                <div className={"mb-4"}>
                    <div className={classes} onClick={() => setConfig(!config)}>2. Axios config</div>
                    {config &&
                    <div className={"px-4"}>
                        <div>Класс <span className={"font-semibold text-green mb-4"}>Http</span></div>
                        <Highlight>
                            {http}
                        </Highlight>
                    </div>
                    }
                </div>
                <div className={"mb-4"}>
                    <div className={classes} onClick={() => setKyConfig(!kyConfig)}>3. KY</div>
                    {kyConfig &&
                    <div className={"px-4"}>
                        <div>Класс <span className={"font-semibold text-green mb-4"}>Ky</span></div>
                        <Highlight>
                            {ky}
                        </Highlight>
                    </div>
                    }
                </div>
            </div>

        </>
    );
};

export default Main;
