import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import { Power } from 'lucide-react';

export const Navbar = ({isLogged, setIsLogged}) => {
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setIsLogged(false);
    }

    return (
        <nav className="relative bg-white shadow ">
            <div className="w-full px-6 py-1.5 mx-auto md:flex">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <img alt={"brand-colivingmate"} src={"/CoLivingMate.png"} className={" h-16 w-24"} />
                    </Link>
                    {isLogged && (
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
                                aria-label="basculer le menu"
                            >
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                )}
                            </button>
                        </div>)}
                </div>
                {isLogged && (
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between md:shadow-none ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                        <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                            <Link to="/"
                                  className={`${location.pathname === "/" ? "font-bold text-lg text-amber-600 drop-shadow-lg hover:font-bold" : "text-gray-700 hover:font-semibold"} px-2.5 py-2  transition-colors duration-300 transform rounded-lg  hover:text-amber-600 md:mx-2`}>
                                Home
                            </Link>
                            <Link to="/myflatshares"
                                  className={`${location.pathname.includes("/myflatshare") ? "font-bold text-lg text-amber-600 drop-shadow-lg hover:font-bold" : "text-gray-700 hover:font-semibold"} px-2.5 py-2  transition-colors duration-300 transform rounded-lg  hover:text-amber-600 md:mx-2`}>
                                My Flat shares
                            </Link>
                            <Link to="/profile"
                                  className={`${location.pathname === "/profile" ? "font-bold text-lg text-amber-600 drop-shadow-lg hover:font-bold" : "text-gray-700 hover:font-semibold" } px-2.5 py-2 transition-colors duration-150 transform rounded-lg  hover:text-amber-600 md:mx-2`}>
                                Profile
                            </Link>
                        </div>

                        <div className="relative mt-4 md:mt-0">

                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                            <div className={"flex flex-row items-center"}>
                                <input
                                    type="text"
                                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg mr-6 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-300"
                                    placeholder="Search"
                                />
                                <div className="group flex relative w-fit">
                                    <Power className="hover:text-red-600 hover:cursor-pointer " size={28} onClick={handleLogout}/>
                                    <span
                                        className="group-hover:block bg-gray-100 px-1 text-sm text-red-700 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full hidden m-4 mx-auto hover:hidden">
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}