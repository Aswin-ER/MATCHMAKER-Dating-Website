/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import { GoogleOAuthProvider, GoogleLogin  } from '@react-oauth/google';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
  console.log(err)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = () => {

    validationSchema.validate({ name, email, password }, { abortEarly: false }).then(()=> {

      axiosInstance.post('/signUp', { name: name, email: email, password: password }).then((response) => {
        console.log(response);
  
        if (response.data.err) {
          const errorMessage = response.data.err;
          setErr(errorMessage);
          toast.error(errorMessage)
        } else if(response.data.message) {
          toast.success(response.data.message,{autoClose: 3000})
          setTimeout(() => {
            navigate('/login'); // Navigate after a short delay
          }, 2000);
        }
  
      }).catch((err) => {
        console.log(err, 'Signup error');
      })

    }).catch((validationErrors)=> {
      console.log(validationErrors.errors,"errors here")
      const errorMessage = validationErrors.errors.join(' ')
      setErr(errorMessage);
      toast.error(errorMessage, {position: toast.POSITION.TOP_RIGHT});
    })

  }


  return (
<GoogleOAuthProvider clientId="684475057007-2abci7ht9ppi3313g5duloq7um38qlp3.apps.googleusercontent.com">
    <div>
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-5">
        MATCH<span className="text-3xl lg:text-5xl font-bold text-center text-pink-700 mt-6 lg:mt-16">MAKER</span>
      </h1>
      <div className="container lg:w-8/12 mobile:w-10/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-10 bg-pink-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl lg:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase">
          Sign Up
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-4/5">
            <label htmlFor='name' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Name</label>
            <input
              type="text"
              className="block w-full lg:px-4 lg:py-2 text-lg lg:text-lg bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              name='name'
            />
          </div>
          <div className="mb-6  w-4/5">
            <label htmlFor='email' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full lg:px-4 lg:py-2  text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              name='email'

            />
          </div>
          <div className="mb-6  w-4/5">
            <label htmlFor='password' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full lg:px-4 lg:py-2  text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              name='password'
            />
          </div>

          <div className="w-1/2 mt-3">
            {/* <div className='text-base text-center mb-4 font-semibold text-red-700'>{err ? err : ""}</div> */}
            <button onClick={handleSubmit} type='button' className="w-full lg:px-1 py-2 text-sm lg:text-lg font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Create Account
            </button>
            <p className='lg:text-lg font-semibold text-center py-3'>OR</p>

            <div className='flex w-full justify-center items-center'>
            <GoogleLogin 
              onSuccess={credentialResponse => {
                axiosInstance.post('/google', credentialResponse).then((res)=> {
                  console.log(res,"loged in");
                  navigate('/login')
                  
                }).catch((err)=> {
                  console.log("login error");
                  setErr(err)
                })
              }}
              onError={() => {
                console.log('');
                setErr("Login Failed")
              }}
              type='standard'
              theme='filled_black'
              size='large'
              text='continue_with'
              shape='square'
            />
            </div>
          </div>
        </form>
        <p className="mt-6 text-sm lg:text-base text-center text-gray-700">
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
