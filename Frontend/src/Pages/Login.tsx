/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';

const Login: FC = () => {
  return (
    <div>
        <h1 className='text-5xl font-bold text-center mt-10'>MATCH<span className='text-5xl font-bold text-center text-pink-700 mt-16'>MAKER</span></h1>
      <div className="container w-4/12 mx-auto px-4 mt-16 bg-pink-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-pink-700 underline decoration-solid uppercase mb-10">
          Sign in
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-full">
            <label className="block text-2xl font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-1 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-2xl font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-1 text-lg bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <a href="#" className="text-sm text-pink-600 hover:underline mb-6">
            Forgot Password?
          </a>
          <div className="w-full">
            <button className="w-full px-6 py-3 text-lg font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-700">
          Don't have an account?{' '}
          <b className="font-medium text-pink-600 hover:underline cursor-pointer">
            Sign up
          </b>
        </p>
      </div>

    </div>
  );
};

export default Login;
