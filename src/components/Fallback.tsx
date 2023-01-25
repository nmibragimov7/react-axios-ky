import React from 'react';

import BaseSpinner from "./base/BaseSpinner/BaseSpinner";

const Fallback = () => {
    return (
        <>
            <div className={"flex justify-center"}>
                <BaseSpinner />
            </div>
        </>
    );
};

export default Fallback;
