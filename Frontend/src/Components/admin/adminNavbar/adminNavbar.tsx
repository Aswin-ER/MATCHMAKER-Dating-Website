/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


const AdminNavbar: FC = () => {

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            console.log(adminToken, "adminToken here");
        } else {
            navigate('/admin');
        }
    }, []);

    const handleClick = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin'
    }

    return (
        <div>
            <nav className="border-gray-200 bg-pink-100">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <a href="#" className="flex items-center">
                        <span className="self-center text-2xl lg:mb-1 lg:text-3xl font-semibold lg:font-bold whitespace-nowrap dark:text-white">ADMIN<span className=' text-pink-700'> MANAGEMENT</span></span>
                    </a>

                    <button
                        data-collapse-toggle="navbar-solid-bg"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                        aria-controls="navbar-solid-bg"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    <div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent">
                            <li>
                                <NavLink to={'/adminHome'} style={({ isActive }) => {
                                    return {
                                        color: isActive ? "darkred" : "black",
                                    };
                                }}>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 lg:text-lg  bg-pink-700 rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        AdminDashboard
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/users'} style={({ isActive }) => {
                                    return {
                                        color: isActive ? "darkred" : "black",
                                    };
                                }}>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 lg:text-lg rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pink-700 lg:p-0"
                                    >
                                        Users
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/adminPremium'} style={({ isActive }) => {
                                    return {
                                        color: isActive ? "darkred" : "black",
                                    };
                                }}>
                                    <a
                                        href="#"
                                        className="block py-2 pl-3 pr-4 lg:text-lg rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pink-700 lg:p-0"
                                    >
                                        Membership
                                    </a>
                                </NavLink>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 lg:text-lg text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pink-700 lg:p-0"
                                    onClick={handleClick}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar;