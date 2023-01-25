import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Header: React.FC = () => {

    return (
        <>
            <div className={"bg-birch p-6"}>
                <div className={"container mx-auto flex justify-between items-center"}>
                    <Link to={"/"} className={"text-xl font-bold text-purple-100 hover:text-purple-dark"}>REACT-EFFECTOR</Link>
                    <div className={"flex gap-8"}>
                        <Link to={"/axios-modify"} className={"font-bold text-purple-100 hover:text-purple-dark"}>Axios modify</Link>
                        <Link to={"/axios-config"} className={"font-bold text-purple-100 hover:text-purple-dark"}>Axios config</Link>
                        <Link to={"/ky"} className={"font-bold text-purple-100 hover:text-purple-dark"}>KY</Link>
                    </div>
                </div>
            </div>
            <div className={"container mx-auto py-8"}>
                <Outlet />
            </div>
        </>
    );
};

export default Header;
