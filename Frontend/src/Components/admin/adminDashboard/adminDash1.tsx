
import React, { FC, useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { adminAxiosInstance } from 'api/axiosInstance';

ChartJS.register(ArcElement, Tooltip, Legend);


ChartJS.register(ArcElement, Tooltip, Legend);


const AdminDash1: FC = () => {

    const [users, setUsers] = useState<number>(0);
    const [premium, setPremium] = useState<number>(0);
    const [profiles, setProfiles] = useState<number>(0);
    const [genderMale, setGenderMale] = useState<number>(0);
    const [genderFemale, setGenderFemale] = useState<number>(0);
    const [age, setAge] = useState<number>(0); 
    const [age1, setAge1] = useState<number>(0);
    const [age2, setAge2] = useState<number>(0); 
    const [age3, setAge3] = useState<number>(0); 

    const data1 = {
        labels: ['Males', 'Females'],
        datasets: [
            {
                label: 'Total',
                data: [genderMale, genderFemale],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    const data = {
        labels: ['18-24', '25-34', '34-44', '45+'],
        datasets: [
            {
                label: 'Total Users',
                data: [age, age1, age2, age3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    useEffect(()=> {
        adminAxiosInstance.get('/admin/totalUsers').then((res)=> {
            setUsers(res.data);
        })

        adminAxiosInstance.get('/admin/totalPremium').then((res) => {
            setPremium(res.data);
        })

        adminAxiosInstance.get('/admin/totalUserProfiles').then((res) => {
            setProfiles(res.data);
        })

        adminAxiosInstance.get('/admin/totalGender').then((res) => {
            setGenderMale(res.data.males);
            setGenderFemale(res.data.females);
        })

        adminAxiosInstance.get('/admin/ageOfUsers').then((res) => {
           setAge(res.data.age);
           setAge1(res.data.age1);
           setAge2(res.data.age2);
           setAge3(res.data.age3);
        })

    }, [])

    return (
        <>
        <div className='bg-white'>
            <div className='mt-14 mb-8 '>
                <h1 className='text-4xl font-semibold text-center text-black'>ADMIN <span className='text-4xl font-semibold text-pink-700'>DASHBOARD</span></h1>
            </div>
            <div className="mt-10 mx-20">
                <div className="flex flex-wrap">
                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div
                            className="flex items-center px-5 py-6 bg-pink-100 rounded-md shadow-sm"
                        >
                            <div className="p-3 bg-current bg-opacity-75 rounded-full">
                                <svg
                                    className="w-8 h-8 text-white"
                                    viewBox="0 0 28 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">{users}</h4>
                                <div className="text-gray-500">Total Users</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div
                            className="flex items-center px-5 py-6 bg-pink-100 rounded-md shadow-sm"
                        >
                            <div className="p-3 bg-current bg-opacity-75 rounded-full">
                                <svg
                                    className="w-8 h-8 text-white"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>

                            <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{premium}</h4>
                                <div className="text-gray-500">Total Premium Membership</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div
                            className="flex items-center px-5 py-6 bg-pink-100 rounded-md shadow-sm"
                        >
                            <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                                <svg
                                    className="w-8 h-8 text-white"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                </svg>
                            </div>

                            <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{profiles}</h4>
                                <div className="text-gray-500">Available User Profiles</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex'>
                <div className='w-2/4 h-140 mt-16 mb-16  mx-30'>
                        <div className='text-xl font-semibold mb-6 text-center text-pink-700 mr-40'>Total Number of Males and Females</div>
                    <Doughnut data={data1} />
                </div>

                <div className='w-2/4 h-140 mt-16 mb-16'>
                        <div className='text-xl font-semibold mb-6 text-center text-pink-700 mr-40'>Age of users</div>
                    <Pie data={data} />
                </div>
            </div>
            </div>
        </>
    )
}

export default AdminDash1;