/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import RootState from '../Redux/rootState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const Login: FC = () => {

  const navigate = useNavigate();
  const user: any = useSelector((state:RootState) => state.userCred.userCred?.name);
  console.log(user,"user here");

  useEffect(()=> {
    if(localStorage.getItem('jwtToken')){
      navigate('/');
    }
  }, []);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailErr, setemailErr] = useState<string>('');
    const [passErr, setpassErr] = useState<string>('');
    const [err, setErr] = useState<string>('');

    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    });

    const handleClick = ()=> {

      validationSchema.validate({ email, password }, { abortEarly: false }).then(()=> {

        axiosInstance.post('/login', {email: email, password: password}).then((res)=> {
          console.log(res);

            if(res.data.success) {
              localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
              toast.success("Loged In successfully",{autoClose: 2000})
              setTimeout(()=> {
                window.location.href='/'
              }, 2000)

            }

            if(res.data.emailErr) {
              toast.error("User not found",{autoClose: 3000});
              setemailErr(res.data.emailErr);
            }

            if(res.data.passErr){
              toast.error("Invalid password",{autoClose: 3000});
              setpassErr(res.data.passErr);
            }
            
        }).catch((err)=> {
            console.log(err, "Login Error");
            
        })
      }).catch((validationErrors)=> {
        console.log(validationErrors.errors,"errors here")
        const errorMessage = validationErrors.errors.join('\n')
        setErr(errorMessage);
        toast.error(errorMessage, {position: toast.POSITION.TOP_RIGHT});
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
    
    <GoogleOAuthProvider clientId="684475057007-2abci7ht9ppi3313g5duloq7um38qlp3.apps.googleusercontent.com" >
    <div>
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-10 mobile:text-2xl">
        MATCH<span className="text-3xl lg:text-5xl font-bold text-center text-pink-700 mt-6 lg:mt-16 mobile:text-2xl">MAKER</span>
      </h1>
      <div className="container mobile:w-10/12 lg:w-8/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-16 bg-pink-100 p-8 rounded-lg shadow-lg ">
        <h1 className="text-2xl lg:text-4xl font-semibold text-center text-pink-700 underline decoration-solid uppercase">
          Sign in
        </h1>
        <form className="flex flex-col items-center">
          <div className="mb-6 w-4/5">
            <label htmlFor='email' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Email</label>
            <input
              type="email"
              className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              name='email'
              id='email'
            />
          </div>
          <div className="mb-6 w-4/5">
            <label htmlFor='password' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
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
            <button type='button' onClick={handleClick} className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Login
            </button>
            <p className='lg:text-lg font-semibold text-center py-3'>OR</p>

              <div className='flex w-full justify-center items-center'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                axiosInstance.post('/google/login', credentialResponse).then((res)=> {
                  if(res.data.success){
                    localStorage.setItem('jwtToken', JSON.stringify(res.data.token));
                    toast.success("Loged In successfully",{autoClose: 2000})
                    setTimeout(()=> {
                      window.location.href ='/'
                    }, 2000)
                  }else{
                    navigate('/signUp');
                  }
                  
                }).catch((err)=> {
                  console.log("login error");
                  setemailErr("login error");
                })
              }}
              onError={() => {
                console.log('login error');
                setemailErr("login error");
              }}
              type='standard'
              theme='filled_black'
              size='medium'
              text='continue_with'
              shape='square'
            />
            </div>
            
          </div>
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
    </GoogleOAuthProvider>
  );
};

export default Login;
