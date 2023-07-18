/* eslint-disable jsx-a11y/anchor-is-valid */
import  React,{FC} from 'react';
import { Link } from 'react-router-dom';

 const Forgot:FC = ()=> {

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        MATCH<span className="text-3xl md:text-5xl font-bold text-center text-pink-700 mt-6 md:mt-16">MAKER</span>
      </h1>
      <div className="container md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto px-4 mt-6 md:mt-16 bg-pink-50 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-pink-700 underline decoration-solid uppercase mb-10">
          Forgot Password
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-4/5">
            <label className="block text-base md:text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-1 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          {/* <div className="mb-6 w-full">
            <label className="block text-base md:text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-1 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div> */}

          <div className="w-1/2">
            <button className="w-full px-1 py-2 text-lg md:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Send
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm md:text-base text-center text-gray-700">
          Already have an account?{' '}
          <Link to="/signUp">
            <b className="font-medium text-pink-600 hover:underline cursor-pointer">
              Sign up
            </b>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Forgot;

