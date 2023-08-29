
import React, { FC, useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';



const AdminPremium: FC = () => {


    const [premium, setPremium] = useState<string[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);

    useEffect(()=> {

        adminAxiosInstance.get('/admin/premium').then((res)=> {
            console.log(res.data, "adminPremium");
            setPremium(res.data);
        })
    }, [])

    const handleSearch = (value: string) => {
        const filtered = premium.filter((user: any) =>
            user.user.name.toLowerCase().includes(value.toLowerCase())
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
                <h1 className='text-4xl font-semibold text-center'>PREMIUM <span className='text-4xl font-semibold text-pink-700'>MEMBERSHIP</span></h1>
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
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Start Date</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">End Date</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Membership Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredUsers.map((user: any, index: number) => {
                                                    return (
                                                        <tr key={index} className="border-b dark:border-neutral-900 border-2 border-pink-200">
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.user.name}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.user.email}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.start_date}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.end_date}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.status}</td>
                                                        </tr>
                                                    )
                                                })
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
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Start Date</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">End Date</th>
                                                <th scope="col" className=" px-6 py-4 text-lg font-semibold text-pink-700">Membership Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                premium.map((user: any, index: number) => {
                                                    return (
                                                        <tr key={index} className="border-b dark:border-neutral-900 border-2 border-pink-200">
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.user.name}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.user.email}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.start_date}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.end_date}</td>
                                                            <td className="whitespace-nowrap  px-6 py-4 font-medium text-lg">{user.status}</td>
                                                        </tr>
                                                    )
                                                })
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

export default AdminPremium;