/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';


const AdminUsers: FC = () => {


    const [users, setUsers] = useState<any>([]);
    const [update, setUpdateUI] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);

    useEffect(() => {
        adminAxiosInstance.get(`/admin/users?page=${page}`).then((res) => {
            setPageCount(res.data?.pagination);
            setUsers(res.data?.users);

        }).catch((err) => {
            console.log(err, "Error")
        })

    }, [update, page])


    const handlePrevious = () => {
        setUpdateUI((prev) => !prev);
        setPage((p: number) => {
            if (p === 1) return page;
            return p - 1;
        });
    }

    const handleNext = () => {
        setUpdateUI((prev) => !prev);
        setPage((p: number) => {
            if (p === pageCount) return p;
            return p + 1;
        })
    }



    const handleClick = (user: any) => {

        adminAxiosInstance.put('/admin/userBlock', user).then((res) => {
            toast.success(res.data.message);
            setUpdateUI((prev) => !prev);
        })
    }

    const handleSearch = (value: string) => {
        const filtered = users.filter((user: any) =>
            user.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filtered, "filtered users")
        setFilteredUsers(filtered);
    };

    const handleSearchClick = () => {
        handleSearch(filteredUsers); 
    };

    return (
        <>
            <div className='mt-16 mb-8'>
                <h1 className='text-4xl font-semibold text-center'>USER <span className='text-4xl font-semibold text-pink-700'>MANAGEMENT</span></h1>
            </div>
            <div className="flex flex-col mx-50 mb-20">
                <div>
                    <input
                        className="p-2 rounded-md border border-pink-300 focus:ring focus:ring-pink-300 focus:border-pink-300 w-1/4"
                        type="text"
                        placeholder="Search Users"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button
                        className="bg-pink-600 text-white p-2 rounded-md"
                        onClick={handleSearchClick}
                    >
                        <FaSearch />
                    </button>
                </div>
                {
                    filteredUsers.length > 0 ?
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead
                                            className="border-b bg-pink-100 font-medium text-current dark:border-neutral-900 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Name</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Email</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                filteredUsers.map((user: any, index: number) => (
                                                    <tr key={index} className="border-b dark:border-neutral-900 border-2 border-pink-200">
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.name}</td>
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.email}</td>
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg" onClick={() => handleClick(user)}>
                                                            {
                                                                user.status === true ?
                                                                    <button className='bg-red-600 font-medium p-3'>Block</button>
                                                                    :
                                                                    <button className='bg-green-500 font-medium p-3'>Unblock</button>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead
                                            className="border-b bg-pink-100 font-medium text-current dark:border-neutral-900 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Name</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Email</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                users.map((user: any, index: number) => (
                                                    <tr key={index} className="border-b dark:border-neutral-900 border-2 border-pink-200">
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.name}</td>
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.email}</td>
                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg" onClick={() => handleClick(user)}>
                                                            {
                                                                user.status === true ?
                                                                    <button className='bg-red-600 font-medium p-3'>Block</button>
                                                                    :
                                                                    <button className='bg-green-500 font-medium p-3'>Unblock</button>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                }
                <div className='flex justify-center pt-10'>
                    <button className='bg-pink-700 p-1 mx-10' disabled={page === 1} onClick={handlePrevious} >
                        Previous
                    </button>
                    <button className='bg-pink-700 p-1' disabled={page === pageCount} onClick={handleNext} >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminUsers;