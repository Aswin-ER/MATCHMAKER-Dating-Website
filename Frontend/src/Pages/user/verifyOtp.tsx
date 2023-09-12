/* eslint-disable jsx-a11y/anchor-is-valid */
import { axiosInstance } from 'api/axiosInstance';
import React, { FC, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const VerifyOtp: FC = () => {

    const { phonenumber } = useParams();

    console.log(phonenumber,"number");

    const [otp, setOtp] = useState<any>(0);

    const handleClick = () => {

        axiosInstance.post('/verifyOtp', { otp: otp, phonenumber: phonenumber}).then((res)=> {
            if(res.data.success){
                console.log(res.data.token,"token here")
                localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
                toast.success("Loged In successfully", { autoClose: 2000 })
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            }

            if(res.data.err){
                toast.error(res.data.err);
            }
        }).catch((err)=> {
            console.log(err)
        })
    }

    return (
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-center mt-10 mobile:text-2xl ">
                MATCH<span className="text-3xl lg:text-4xl font-bold text-center text-pink-700 mt-6 lg:mt-16 mobile:text-2xl">MAKER</span>
            </h1>
            <div className="container mobile:w-10/12 lg:w-8/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-16 bg-pink-100 p-8 rounded-lg shadow-lg ">
                <h1 className="text-2xl lg:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase">
                    Verify OTP
                </h1>
                <form className="flex flex-col items-center">
                    <div className="mb-6 w-4/5">
                        <label htmlFor='phonenumber' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Enter OTP</label>
                        <input
                            type="phonenumber"
                            className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 dark:text-black"
                            onChange={(e) => setOtp(e.target.value)}
                            name='phonenumber'
                            id='phonenumber'
                        />
                    </div>

                    <div className="w-1/2 mt-3">
                        <button type='button' onClick={handleClick} className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
                            Send otp
                        </button>
                    </div>

                    <Link to={'/login'}><a href="#" className="text-sm  text-pink-600 hover:underline mb-6">
                        Login with email
                    </a>
                    </Link>
                </form>
                <p className="mt-6 text-sm lg:text-base text-center text-gray-700">
                    Don't have an account?{' '}
                    <Link to="/signUp">
                        <b className="font-medium text-pink-600 hover:underline cursor-pointer">
                            Sign up
                        </b>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default VerifyOtp;