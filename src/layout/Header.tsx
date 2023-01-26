import React from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {classes} from "../core/helpers/classes";

interface LinkProps {
    to: string;
    title: string;
}

const links: LinkProps[] = [
    { to: "/axios-modify", title: "Axios modify" },
    { to: "/axios-config", title: "Axios config" },
    { to: "/ky", title: "KY" },
];

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <div className={"bg-birch p-6"}>
                <div className={"container mx-auto flex justify-between items-center"}>
                    <Link to={"/"} className={"text-xl font-bold text-purple-100 hover:text-purple-dark"}>REACT-EFFECTOR</Link>
                    <div className={"flex gap-8"}>
                        {links.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={classes("font-bold text-purple-100 hover:text-purple-dark", {"text-purple": location.pathname === link.to})}
                            >
                                {link.title}
                            </Link>
                        ))}
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
