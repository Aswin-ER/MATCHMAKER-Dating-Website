
import React, { FC, useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

// import { useNavigate } from 'react-router-dom';


const AdminUsers: FC = () => {


    const [users, setUsers] = useState<any>([]);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);


    useEffect(() => {
        adminAxiosInstance.get('/admin/users').then((res) => {
            console.log(res.data, "user details here");
            setUsers(res.data);
        }).catch((err) => {
            console.log(err, "Error")
        })

    }, [])


    const handleClick = (user: any) => {

        adminAxiosInstance.put('/admin/userBlock', user).then((res) => {
            toast.success(res.data.message);
            setTimeout(() => {
                window.location.href = '/users'
            }, 2000)
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
        handleSearch(filteredUsers); // Replace searchQuery with your state name
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
                        <FaSearch/>
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
            </div>
        </>
    )
}

export default AdminUsers;