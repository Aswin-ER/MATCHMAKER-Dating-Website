/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserCred } from 'Redux/slice';
import RootState from 'Redux/rootState';


const Plans: FC = () => {

    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);
    console.log(user)


    return (
        <>
            <div className="container my-24 mx-auto md:px-6 xl:px-32">
                <section className="mb-32">
                    <div
                        className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <div className="flex flex-wrap items-center">
                            <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
                                <img src="https://tecdn.b-cdn.net/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                                    className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
                            </div>
                            <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
                                <div className="px-6 py-12 md:px-12">
                                    <h2 className="mb-6 pb-2 text-4xl font-bold">MATCHMAKER PRO</h2>
                                    <p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                                        soluta corporis voluptate ab error quam dolores doloremque,
                                        quae consectetur.
                                    </p>
                                    <div className="mb-6 flex flex-wrap">
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Support 24/7
                                            </p>
                                        </div>
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Analytics
                                            </p>
                                        </div>
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Components
                                            </p>
                                        </div>
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Updates
                                            </p>
                                        </div>
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Reports
                                            </p>
                                        </div>
                                        <div className="mb-6 w-full md:w-4/12 lg:w-6/12 xl:w-4/12">
                                            <p className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" className="mr-3 h-5 w-5 text-success">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Mobile
                                            </p>
                                        </div>
                                    </div>
                                    <button type="button"
                                        className="inline-block rounded bg-primary px-12 pt-3.5 pb-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init data-te-ripple-color="light">
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Plans;