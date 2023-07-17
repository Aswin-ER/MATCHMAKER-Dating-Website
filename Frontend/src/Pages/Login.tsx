/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';

const Login: FC = () => {

  const navigate = useNavigate();

  useEffect(()=> {
    if(localStorage.getItem('jwtToken')){
      navigate('/');
    }
  }, []);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailErr, setemailErr] = useState<string>('');
    const [passErr, setpassErr] = useState<string>('');

    const handleClick = ()=> {
        axiosInstance.post('/login', {email: email, password: password}).then((res)=> {
          console.log(res);

            if(res.data.success) {
              localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
              window.location.href ='/'
            }

            if(res.data.emailErr) {
              setemailErr(res.data.emailErr);
            }

            if(res.data.passErr){
              setpassErr(res.data.passErr);
            }
            
        }).catch((err)=> {
            console.log(err, "Login Error");
            
        })
    }


    //passErr and emailErr
    useEffect (()=> {
      const emailTimer = setTimeout(()=> {
        setemailErr('');
      }, 3000);

      const passwordTimer = setTimeout(()=> {
        setpassErr('');
      }, 3000);
      
      return ()=> {
        clearTimeout(emailTimer);
        clearTimeout(passwordTimer);
      }
    }, [emailErr,passErr]);


  return (

    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        MATCH<span className="text-3xl md:text-5xl font-bold text-center text-pink-700 mt-6 md:mt-16">MAKER</span>
      </h1>
      <div className="container md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto px-4 mt-6 md:mt-16 bg-pink-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase mb-10">
          Sign in
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-4/5">
            <label htmlFor='email' className="block text-base md:text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-1 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              name='email'
              id='email'
            />
          </div>
          <div className="mb-6 w-4/5">
            <label htmlFor='password' className="block text-base md:text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-1 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              name='password'
              id='password'
            />
          </div>
         <Link to={'/forgot'}><a href="#" className="text-sm  text-pink-600 hover:underline mb-6">
            Forgot Password?
          </a>
          </Link>
          <div className="w-1/2 mt-5">
          <div className='text-base text-center mb-4 font-semibold text-red-700'>{emailErr ? emailErr : ""}</div>
          <div className='text-base text-center mb-4 font-semibold text-red-700'>{passErr ? passErr : ""}</div>
            <button type='button' onClick={handleClick} className="w-full px-6 py-3 text-lg md:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Login
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm md:text-base text-center text-gray-700">
          Don't have an account?{' '}
          <Link to="/signUp">
            <b className="font-medium text-pink-600 hover:underline cursor-pointer">
              Sign up
            </b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
