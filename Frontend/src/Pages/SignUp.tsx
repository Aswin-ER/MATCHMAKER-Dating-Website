/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import { userBaseUrl } from '../utils/Const';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



const SignUp: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      navigate('/');
    }

  }, []);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string>('');

  const handleSubmit = () => {
    console.log(userBaseUrl);

    axiosInstance.post('/signUp', { name: name, email: email, password: password }).then((response) => {
      console.log(response);

      if (response.data.err) {
        console.log(response.data.err);
        setErr(response.data.err);
      } else {
        navigate('/login')
      }

    }).catch((err) => {
      console.log(err, 'Signup error');
    })

  }


  return (
<GoogleOAuthProvider clientId="684475057007-2abci7ht9ppi3313g5duloq7um38qlp3.apps.googleusercontent.com">
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-5">
        MATCH<span className="text-3xl md:text-5xl font-bold text-center text-pink-700 mt-6 md:mt-16">MAKER</span>
      </h1>
      <div className="container md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto px-4 mt-6 md:mt-10 bg-pink-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase">
          Sign Up
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-4/5">
            <label htmlFor='name' className="block text-base md:text-lg font-medium text-gray-800 mb-2">Name</label>
            <input
              type="text"
              className="block w-full px-4 py-2 text-lg md:text-lg bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              name='name'
            />
          </div>
          <div className="mb-6  w-4/5">
            <label htmlFor='email' className="block text-base md:text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full px-4 py-2  text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              name='email'

            />
          </div>
          <div className="mb-6  w-4/5">
            <label htmlFor='password' className="block text-base md:text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2  text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              name='password'
            />
          </div>

          <div className="w-1/2 mt-3">
            <div className='text-base ml-14 mb-4 font-semibold text-red-700'>{err ? err : ""}</div>
            <button onClick={handleSubmit} type='button' className="w-full px-1 py-2 text-lg md:text-lg font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Create Account
            </button>
            <p className='text-lg text-center py-3'>OR</p>

            <GoogleLogin
              onSuccess={credentialResponse => {
                axiosInstance.post('/google', credentialResponse).then((res)=> {
                  console.log(res,"loged in");
                  
                }).catch((err)=> {
                  console.log("login error");
                  
                })
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />

          </div>
        </form>
        <p className="mt-6 text-sm md:text-base text-center text-gray-700">
          Already have an account?{' '}
          <Link to={'/login'}> <b className="font-medium text-pink-600 hover:underline cursor-pointer">
            Sign in
          </b>
          </Link>
        </p>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
