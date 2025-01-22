import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faHome,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Navbar.css";
// import { logoCoin } from "../images";
import "../assets/styles/logoCoin.css";

const Navbar: React.FC = () => {
    return (
        <>
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-[#272a2f] flex justify-around items-center rounded-2xl text-xs">
                <div className="text-center text-[#85827d] bg-[#1c1f24] w-1/3 m-1 p-2 rounded-2xl flex flex-col items-center">
                    <NavLink
                        to={`/home`}
                        className={({ isActive }) =>
                            isActive
                                ? "active mt-1 flex flex-col items-center"
                                : "inactive mt-1 flex flex-col items-center"
                        }
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={faHome} size="3x" />
                    </NavLink>
                </div>
                <div className="text-center text-[#85827d] bg-[#1c1f24] w-1/3 m-1 p-2 rounded-2xl flex flex-col items-center">
                    <NavLink
                        to={`/friends`}
                        className={({ isActive }) =>
                            isActive
                                ? "active mt-1 flex flex-col items-center"
                                : "inactive mt-1 flex flex-col items-center"
                        }
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={faUserFriends} size="3x" />
                    </NavLink>
                </div>
                <div className="text-center text-[#85827d] bg-[#1c1f24] w-1/3 m-1 p-2 rounded-2xl flex flex-col items-center">
                    <NavLink
                        to={`/earn`}
                        className={({ isActive }) =>
                            isActive
                                ? "active mt-1 flex flex-col items-center"
                                : "inactive mt-1 flex flex-col items-center"
                        }
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={faCoins} size="3x" />
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
